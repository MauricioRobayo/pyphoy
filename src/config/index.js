import { format } from "date-fns";
import { es } from "date-fns/locale";

export const site = {
  env: process.env.NODE_ENV || "development",
  name: "Pico y placa hoy",
  title({ city, category, number, date = "" } = {}) {
    if (!city) {
      return "Toda la información sobre el pico y placa en Colombia";
    }
    const base = `Pico y placa`;
    if (!category) {
      return `${base} ${city}`;
    }
    if (!number) {
      return `${base} ${category.toLowerCase()} en ${city}${date &&
        ` ${date.replace(",", "")}`}`;
    }
    return `${base} ${category.toLowerCase()} en ${city} placas número ${number}${date &&
      ` ${date.replace(",", "")}`}`;
  },
  description({ city, category, number, date = "" } = {}) {
    const base = `Horarios, días, fechas, ${
      number ? "" : "placas, números, "
    }decretos, exensiones, sanciones y toda la información vigente del pico y placa`;
    if (!city) {
      return `${base} en Colombia.`;
    }
    if (!category) {
      return `${base} en ${city}`;
    }
    if (!number) {
      return `${base} ${category.toLowerCase()} en ${city}${date &&
        ` el ${date.replace(",", "")}`}`;
    }
    return `${base} ${category.toLowerCase()} en ${city} placas número ${number}${date &&
      ` el ${date.replace(",", "")}`}`;
  }
};

export const helpers = {
  longDate: "cccc, d 'de' MMMM 'de' yyyy",
  format(date, formatString) {
    return format(date, formatString || "yyyy-MM-dd", { locale: es });
  },
  cdn(path) {
    const p = path.startsWith("/") ? path : `/${path}`;
    if (site.env === "production") {
      return `https://cdn.pyphoy.com${p}`;
    }
    return `${p}`;
  },
  convert24toAMPM(hour24) {
    if (hour24 === "12:00") return `${hour24}m.`;
    const [hours, minutes] = hour24.split(":");
    const hoursNumber = parseInt(hours, 10);
    if (hoursNumber === 12) return `${hour24}pm`;
    return hoursNumber > 12
      ? `${hoursNumber - 12}:${minutes}pm`
      : `${hoursNumber}:${minutes}am`;
  },
  dump(obj) {
    return JSON.stringify(obj, null, 2);
  }
};

export const pyptron = {
  host: "127.0.0.1:3245",
  protocol: "http",
  url() {
    return `${this.protocol}://${this.host}`;
  }
};
