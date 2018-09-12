import fecha from "fecha";

// Override fecha.i18n to support any language
fecha.i18n = {
  dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
  dayNames: [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado"
  ],
  monthNamesShort: [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic"
  ],
  monthNames: [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre"
  ],
  amPm: ["am", "pm"],
  // D is the day of the month, function returns something like...  3rd or 11th
  DoFn(D) {
    return (
      D +
      ["th", "st", "nd", "rd"][
        D % 10 > 3 ? 0 : ((D - (D % 10) !== 10) * D) % 10
      ]
    );
  }
};

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
  format: fecha.format,
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
