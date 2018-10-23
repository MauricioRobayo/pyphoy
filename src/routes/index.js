/* eslint no-prototype-builtins: 0 */

import debugFunc from "debug";
import { Router } from "express";
import { format } from "fecha";
import { fetchUrl } from "fetch";
import sm from "sitemap";
import { pyptron, site } from "../config";

const log = debugFunc("pyphoy:routes");
const router = Router();
const api = pyptron.url();

router.get("/sitemap.xml", (req, res) => {
  const lastmod = new Date();
  lastmod.setHours(0, 0, 0, 0);
  let urls = [
    {
      url: site.url,
      lastmod,
      changefreq: "daily",
      priority: 1
    }
  ];
  urls = urls.concat(
    Object.keys(req.app.locals.citiesMap).reduce((paths, city) => {
      paths.push({
        url: `/${city}`,
        lastmod,
        changefreq: "daily",
        priority: 0.8
      });
      Object.keys(req.app.locals.citiesMap[city].categories).forEach(
        category => {
          paths.push({
            url: `/${city}/${category}`,
            lastmod,
            changefreq: "daily",
            priority: 0.6
          });
          if (
            city === "manizales" &&
            category === "transporte-publico-colectivo"
          ) {
            ["H", "I", "J", "A", "B", "C", "D", "E", "F", "G"].forEach(num => {
              paths.push({
                url: `/${city}/${category}/${num}`,
                lastmod,
                changefreq: "daily",
                priority: 0.2
              });
            });
          } else {
            for (let i = 0; i <= 9; i += 1) {
              paths.push({
                url: `/${city}/${category}/${i}`,
                lastmod,
                changefreq: "daily",
                priority: 0.2
              });
            }
          }
        }
      );
      return paths;
    }, [])
  );
  const sitemap = sm.createSitemap({
    hostname: site.url,
    cacheTime: 600000, // 600 sec - cache purge period
    urls
  });
  sitemap.toXML((err, xml) => {
    if (err) {
      res.status(500).end();
      return;
    }
    res.header("Content-Type", "application/xml");
    res.send(xml);
  });
});

/* GET home page. */
router.get("/", async (req, res, next) => {
  const date = req.query.d || format(new Date(), "YYYY-MM-DD");
  fetchUrl(`${api}?date=${date}`, (err, meta, body) => {
    if (err) {
      next(err);
      return;
    }
    if (meta.status !== 200) {
      next();
      return;
    }
    res.render("home", {
      pypData: JSON.parse(body),
      ISODate: `${date}T05:00:00.000Z`,
      amp: !!req.query.d,
      pagePath: req.path
    });
  });
});

/* GET home page. */
router.get("/:city/exentos", async (req, res, next) => {
  const date = req.query.d || format(new Date(), "YYYY-MM-DD");
  const { citiesMap } = res.locals;
  const { city } = req.params;
  // verificamos que la ciudad solicitada esté disponible
  if (!citiesMap.hasOwnProperty(city)) {
    next();
    return;
  }
  fetchUrl(`${api}/${city}`, (err, meta, body) => {
    if (err) {
      next(err);
      return;
    }
    if (meta.status !== 200) {
      next();
      return;
    }
    const path = [
      {
        path: city,
        name: citiesMap[city].name
      },
      {
        path: "exentos",
        name: "Exentos"
      }
    ];
    res.render("exceptions", {
      pypData: JSON.parse(body),
      ISODate: `${date}T05:00:00.000Z`,
      amp: !!req.query.d,
      path,
      pagePath: req.path
    });
  });
});

/* GET city page. */
router.get("/:city", async (req, res, next) => {
  const date = format(new Date(), "YYYY-MM-DD");
  const { citiesMap } = res.locals;
  const { city } = req.params;
  // verificamos que la ciudad solicitada esté disponible
  if (!citiesMap.hasOwnProperty(city)) {
    log("La ciudad solicitada no existe.");
    next();
    return;
  }
  const path = [
    {
      path: city,
      name: citiesMap[city].name
    }
  ];
  fetchUrl(`${api}/${city}?date=${date}`, (err, meta, body) => {
    if (err) {
      next(err);
      return;
    }
    if (meta.status !== 200) {
      next();
    }
    res.render("city", {
      pypData: JSON.parse(body),
      ISODate: `${date}T05:00:00.000Z`,
      path,
      pagePath: req.path
    });
  });
});

/* GET category page. */
router.get("/:city/:category", async (req, res, next) => {
  const dateObject = req.query.d
    ? new Date(`${req.query.d}T05:00:00.000Z`)
    : new Date();
  const startDateObject = new Date(dateObject);
  startDateObject.setDate(dateObject.getDate() - 6);
  const formatedStartDateObject = format(startDateObject, "YYYY-MM-DD");
  const formatedDate = format(dateObject, "YYYY-MM-DD");
  log("getting date from:", req.query.d, formatedDate);
  const { citiesMap } = res.locals;
  const { city, category } = req.params;
  // verificamos que la ciudad solicitada se encuentre disponible
  if (!citiesMap.hasOwnProperty(city)) {
    log("La ciudad solicitada no existe.");
    next();
    return;
  }
  // verificamos que la categoría solicita se encuentre disponible dentro de la ciudad
  if (!citiesMap[city].categories.hasOwnProperty(category)) {
    log("La categoría solicitada no existe.");
    next();
    return;
  }
  const path = [
    {
      path: city,
      name: citiesMap[city].name
    },
    {
      path: category,
      name: citiesMap[city].categories[category].name
    }
  ];
  fetchUrl(
    `${api}/${city}/${category}?days=13&date=${formatedStartDateObject}`,
    (err, meta, body) => {
      if (meta.status === 404) {
        next();
        return;
      }
      if (err) {
        next(err);
        return;
      }
      res.render("category", {
        pypData: JSON.parse(body),
        ISODate: `${formatedDate}T05:00:00.000Z`,
        path,
        amp: !!req.query.d && req.query.d !== format(new Date(), "YYYY-MM-DD"),
        pagePath: req.path
      });
    }
  );
});

/* GET Query page. */
router.get("/:city/:category/:number", async (req, res, next) => {
  const date = req.query.d || format(new Date(), "YYYY-MM-DD");
  const { citiesMap } = res.locals;
  const { city, category, number } = req.params;
  const num = number.toString().toUpperCase();
  if (city === "manizales" && category === "transporte-publico-colectivo") {
    if (!["H", "I", "J", "A", "B", "C", "D", "E", "F", "G"].includes(num)) {
      next();
      return;
    }
  } else if (
    !["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(num)
  ) {
    next();
    return;
  }

  // verificamos que la ciudad solicitada se encuentre disponible
  if (!citiesMap.hasOwnProperty(city)) {
    next();
    return;
  }
  // verificamos que la categoría solicita se encuentre disponible dentro de la ciudad
  if (!citiesMap[city].categories.hasOwnProperty(category)) {
    next();
    return;
  }
  const path = [
    {
      path: city,
      name: citiesMap[city].name
    },
    {
      path: category,
      name: citiesMap[city].categories[category].name
    },
    {
      path: number,
      name: number
    }
  ];
  fetchUrl(`${api}/${city}/${category}?days=30`, (err, meta, body) => {
    if (err) {
      next(err);
      return;
    }
    const pypData = JSON.parse(body);
    const status = pypData.data[0].categories[0].pyp.split("-").includes(num);
    const nextPyp = pypData.data.filter(val =>
      val.categories[0].pyp.split("-").includes(num)
    );
    res.render("number", {
      pypData,
      nextPyp,
      num,
      status,
      ISODate: `${date}T05:00:00.000Z`,
      amp: !!req.query.d,
      path,
      pagePath: req.path
    });
  });
});

export default router;
