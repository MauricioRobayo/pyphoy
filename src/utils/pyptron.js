const { URL, URLSearchParams } = require("url");
const { request } = require("./request");
const { url } = require("../config").pyptron;

module.exports = async (options = {}) => {
  const { city = "", category = "", queryParams } = options;

  const pyptronApiEndpoint = url;

  const urlObject = new URL(pyptronApiEndpoint);
  urlObject.search = new URLSearchParams(queryParams);
  urlObject.pathname += `${city ? `/${city}` : ""}${
    category ? `/${category}` : ""
  }`;

  return request(urlObject);
};
