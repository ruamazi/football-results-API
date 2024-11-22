import { addBaseUrlToImages } from "./addBaseUrlToImages.js";
import { errorHandler } from "./errorHandler.js";
import { getCurrentDate } from "./getCurrentDate.js";

export const goalAPI = async (req, res) => {
  const todayDate = getCurrentDate();
  const timeZoneOffset = new Date().getTimezoneOffset();
  const url = `${
    process.env.GOAL_URL
  }&date=${todayDate}&tzoffset=${-timeZoneOffset}`;

  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      return errorHandler(res, 404);
    }
    const data = await resp.json();
    const finalData = addBaseUrlToImages(data, "https://www.goal.com");
    return res.status(200).send(finalData);
  } catch (error) {
    errorHandler(res, 500, error);
  }
};
