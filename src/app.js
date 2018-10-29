import cookieParser from "cookie-parser";
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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "..", "public")));

// pass variables to our templates + all requests
app.use((req, res, next) => {
  // La fecha con la que vamos a trabajar, si se solicita una fecha en
  // particular, esa es la fecha con la que se va a trabajar.
  const date = req.query.d
    ? new Date(req.query.d.replace(/-/g, "/"))
    : new Date();
  fetchUrl(`${api}/cities`, (err, meta, body) => {
    if (err) {
      next(err);
      return;
    }
    log("Getting citiesMap!");
    res.locals.citiesMap = JSON.parse(body);
    res.locals.site = site;
    res.locals.helpers = helpers;
    res.locals.d = date;
    res.locals.dtString = helpers.format(date, "YYYY/MM/DD");
    res.locals.date = helpers.format(date, "dddd, D [de] MMMM [de] YYYY");
    res.locals.ISODate = date.toISOString();
    res.locals.ISODateShort = res.locals.ISODate.substring(0, 10);
    res.locals.pagePath = req.path;
    res.locals.semester = date.getMonth() <= 5 ? "primer" : "segundo";
    res.locals.timePeriod = `${
      res.locals.semester
    } semestre del ${date.getFullYear()}`;
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
  res.locals.env = process.env.NODE_ENV;
  res.locals.message = err.message;
  res.locals.error = app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
