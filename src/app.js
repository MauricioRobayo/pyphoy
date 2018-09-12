import cookieParser from "cookie-parser";
import express from "express";
import createError from "http-errors";
import logger from "morgan";
import { join } from "path";
import debug from "debug";
import { fetchUrl } from "fetch";
import indexRouter from "./routes";
import { site, helpers, pyptron } from "./config";

const log = debug("pyphoy:app");

const api = pyptron.url();

const app = express();

fetchUrl(`${api}/cities`, (err, meta, body) => {
  log("Getting citiesMap!");
  app.locals.citiesMap = JSON.parse(body);
});

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
  res.locals.site = site;
  res.locals.helpers = helpers;
  next();
});

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
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
