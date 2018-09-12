import debug from "debug";
import http from "http";
import app from "../app";
import { serverConfig } from "../config";

const log = debug("pyphoy:server");

/**
 * Get port from environment and store in Express.
 */

app.set("port", serverConfig.port);

app.locals.env = process.env.NODE_ENV;

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind =
    typeof port === "string"
      ? `Pipe ${serverConfig.port}`
      : `Port ${serverConfig.port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      // eslint-disable-next-line no-console
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      // eslint-disable-next-line no-console
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  log(`Listening on ${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(serverConfig.port);
server.on("error", onError);
server.on("listening", onListening);
