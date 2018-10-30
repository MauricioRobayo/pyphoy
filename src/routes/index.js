/* eslint no-prototype-builtins: 0 */

import debugFunc from "debug";
import { Router } from "express";
import { fetchUrl } from "fetch";
import sm from "sitemap";
import { helpers, pyptron, site } from "../config";

const log = debugFunc("pyphoy:routes");
const router = Router();
const api = pyptron.url();

router.get("/sitemap.xml", (req, res) => {
  const lastmod = res.locals.dt;
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
    Object.keys(res.locals.citiesMap).reduce((paths, city) => {
      paths.push({
        url: `/${city}`,
        lastmod,
        changefreq: "daily",
        priority: 0.8
      });
      Object.keys(res.locals.citiesMap[city].categories).forEach(category => {
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
      });
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

router.get("/", async (req, res, next) => {
  const date = res.locals.dtString.replace(/\//g, "-");
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
      home: true
    });
  });
});

router.get("/:city/exentos", async (req, res, next) => {
  const { citiesMap } = res.locals;
  const { city } = req.params;
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
    const pypData = JSON.parse(body);
    const cityName = pypData.name;
    const title = `Vehículos exentos de pico y placa en ${cityName}`;
    const path = [
      {
        path: city,
        name: cityName
      },
      {
        path: "exentos",
        name: "Exentos"
      }
    ];
    res.render("exceptions", {
      pypData,
      cityName,
      title,
      path
    });
  });
});

router.get("/:city", async (req, res, next) => {
  const date = res.locals.dtString.replace(/\//g, "-");
  const { citiesMap } = res.locals;
  const { city } = req.params;
  if (!citiesMap.hasOwnProperty(city)) {
    log("La ciudad solicitada no existe.");
    next();
    return;
  }
  fetchUrl(`${api}/${city}?date=${date}`, (err, meta, body) => {
    if (err) {
      next(err);
      return;
    }
    if (meta.status !== 200) {
      next();
      return;
    }
    const pypData = JSON.parse(body);
    const cityName = pypData.name;
    const title = site.title({ city: cityName });
    const description = site.description({ city: cityName });
    const path = [
      {
        path: city,
        name: cityName
      }
    ];
    res.render("city", {
      pypData,
      path,
      cityName,
      title,
      description
    });
  });
});

router.get("/:city/:category", async (req, res, next) => {
  const daysBack = req.query.b ? parseInt(req.query.b, 10) : 3;
  const daysForward = req.query.f ? parseInt(req.query.f, 10) : 6;
  const totalDays = daysBack + daysForward + 1;
  if (totalDays > 31) {
    next();
    return;
  }
  res.locals.d.setDate(res.locals.d.getDate() - daysBack);
  const startISODateShort = helpers.format(res.locals.d);
  const { citiesMap } = res.locals;
  const { city, category } = req.params;
  if (!citiesMap.hasOwnProperty(city)) {
    log("La ciudad solicitada no existe.");
    next();
    return;
  }
  if (!citiesMap[city].categories.hasOwnProperty(category)) {
    log("La categoría solicitada no existe.");
    next();
    return;
  }
  fetchUrl(
    `${api}/${city}/${category}?days=${totalDays}&date=${startISODateShort}`,
    (err, meta, body) => {
      if (meta.status === 404) {
        next();
        return;
      }
      if (err) {
        next(err);
        return;
      }
      const pypData = JSON.parse(body);
      const cityName = pypData.name;
      const categoryName = citiesMap[city].categories[category].name;
      const title = site.title({ city: cityName, category: categoryName });
      const SEOTitle = site.title({
        city: cityName,
        category: categoryName,
        date: (res.locals.archive && res.locals.date) || ""
      });
      const description = site.description({
        city: cityName,
        category: categoryName,
        date: (res.locals.archive && res.locals.date) || ""
      });
      const path = [
        {
          path: city,
          name: cityName
        },
        {
          path: category,
          name: categoryName
        }
      ];
      // Como la fecha de base para construir la página y por lo tanto si la fecha
      // de la query (por ejemplo: ?d=2018-10-12) no coincide con la fecha actual,
      // vamos a desconocer al fecha actual, que necesitamos para validar en la
      // creación de la página si estamos hablando de hoy.
      // Debido a que esta página recibe como query una fecha, esa fecha se usa
      const today = new Date();
      const todayISODate = today.toISOString();
      const todayISODateShort = helpers.format(today);
      res.render("category", {
        pypData,
        cityName,
        categoryName,
        title,
        SEOTitle,
        description,
        today,
        todayISODate,
        todayISODateShort,
        path
      });
    }
  );
});

/* GET Query page. */
router.get("/:city/:category/:number", async (req, res, next) => {
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
  fetchUrl(`${api}/${city}/${category}?days=30`, (err, meta, body) => {
    if (err) {
      next(err);
      return;
    }
    const pypData = JSON.parse(body);
    const cityName = pypData.name;
    const categoryName = citiesMap[city].categories[category].name;
    const title = site.title({
      city: cityName,
      category: categoryName,
      number: num
    });
    const description = site.description({
      city: cityName,
      category: categoryName,
      number: num
    });
    const status = pypData.data[0].categories[0].pyp.split("-").includes(num);
    const nextPyp = pypData.data.filter(val =>
      val.categories[0].pyp.split("-").includes(num)
    );
    const path = [
      {
        path: city,
        name: cityName
      },
      {
        path: category,
        name: categoryName
      },
      {
        path: number,
        name: number
      }
    ];
    res.render("number", {
      cityName,
      categoryName,
      title,
      description,
      pypData,
      nextPyp,
      num,
      status,
      path
    });
  });
});

export default router;
