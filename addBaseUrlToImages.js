export function addBaseUrlToImages(data, baseUrl) {
  function processUrl(url) {
    if (
      typeof url === "string" &&
      !url.startsWith("http://") &&
      !url.startsWith("https://")
    ) {
      return baseUrl + url;
    }
    return url;
  }

  function recursiveCheck(obj) {
    if (Array.isArray(obj)) {
      return obj.map((item) => recursiveCheck(item));
    }

    if (typeof obj === "object" && obj !== null) {
      const result = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (key === "url") {
            result[key] = processUrl(obj[key]);
          } else {
            result[key] = recursiveCheck(obj[key]);
          }
        }
      }
      return result;
    }
    return obj;
  }
  return recursiveCheck(data);
}
