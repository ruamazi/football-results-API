import { errorHandler } from "./errorHandler.js";
import { getCurrentDate } from "./getCurrentDate.js";

export const bbcAPI = async (req, res) => {
  const todayDate = getCurrentDate();
  const url = `${process.env.BBC_DATA_URL}selectedEndDate=${todayDate}&selectedStartDate=${todayDate}&todayDate=${todayDate}&urn=urn%3Abbc%3Asportsdata%3Afootball%3Atournament-collection%3Acollated`;
  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      return errorHandler(res, 404);
    }
    const data = await resp.json();
    res.json(data);
  } catch (error) {
    errorHandler(res, 500, error);
  }
};
