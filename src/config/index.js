import { format } from "date-fns";
import { es } from "date-fns/locale";

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

export const env = process.env.NODE_ENV || "development";
export const port = normalizePort(process.env.PORT) || 3000;
export const url =
  env === "production" ? "https://www.pyphoy.com" : `http://localhost:${port}`;

export const serverConfig = {
  port
};

export const site = {
  env,
  url,
  name: "Pico y placa hoy"
};

export const helpers = {
  longDate: "cccc, d 'de' MMMM 'de' yyyy",
  format(date, formatString) {
    return format(date, formatString || "yyyy-MM-dd", { locale: es });
  },
  cdn(path) {
    const p = path.startsWith("/") ? path : `/${path}`;
    if (env === "production") {
      return `https://cdn.pyphoy.com${p}`;
    }
    return `${p}`;
  },
  dump(obj) {
    return JSON.stringify(obj, null, 2);
  }
};

export const pyptron = {
  ip: "127.0.0.1",
  port: "3245",
  protocol: "http",
  url() {
    return `${this.protocol}://${this.ip}:${this.port}`;
  }
};
