import debug from "debug";
import express from "express";
import { fetchUrl } from "fetch";
import createError from "http-errors";
import logger from "morgan";
import { join } from "path";
import { helpers, pyptron, site } from "./config";
import indexRouter from "./routes";

const log = debug("pyphoy:app");
const api = pyptron.url();
const app = express();

// view engine setup
app.set("views", join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.static(join(__dirname, "..", "assets")));

app.use((req, res, next) => {
  // La fecha con la que vamos a trabajar, si se solicita una fecha en
  // particular, esa es la fecha con la que se va a trabajar.
  const date = req.query.d
    ? new Date(req.query.d.replace(/-/g, "/"))
    : new Date();
  fetchUrl(`${api}/`, (err, meta, body) => {
    if (err) {
      next(err);
      return;
    }
    log("Setting variables for all templates.");
    res.locals.citiesMap = JSON.parse(body);
    res.locals.site = site;
    res.locals.helpers = helpers;
    res.locals.d = date;
    res.locals.ISODate = date.toISOString();
    res.locals.ISODateShort = helpers.format(date);
    res.locals.dtString = res.locals.ISODateShort.replace(/-/g, "/");
    res.locals.date = helpers.format(date, helpers.longDate);
    res.locals.pagePath = req.path;
    res.locals.url = `${req.protocol}://${req.get("host")}`;
    res.locals.fullUrl = `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }`;
    res.locals.semester = date.getMonth() <= 5 ? "primer" : "segundo";
    res.locals.timePeriod = `${
      res.locals.semester
    } semestre del ${date.getFullYear()}`;
    res.locals.archive = !!req.query.d;
    next();
  });
});

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  log("No existe la URI solicitada, creamos el error y continuamos.");
  next(
    createError(
      404,
      ":( Al parecer no disponemos de la información solicitada."
    )
  );
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
