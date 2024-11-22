import { errorHandler } from "./errorHandler.js";
import { getCurrentDate } from "./getCurrentDate.js";

export const beinAPI = async (req, res) => {
  let { lang } = req.query;
  if (!lang) {
    lang = "en";
  }
  const timeZone = Intl.DateTimeFormat()
    .resolvedOptions()
    .timeZone.replace("/", "%2F");
  const time = getCurrentTimeFormatted();
  const date = getCurrentDate();
  const dateObj = new Date(date);
  dateObj.setDate(dateObj.getDate() - 1);
  const previousDate = dateObj.toISOString().split("T")[0];

  const url = `${process.env.BEIN_URL}?desiredLanguage=${lang}-mena&eventDate=${previousDate}&eventTime=${time}&timezone=${timeZone}&section=calendar&favouriteTeamIds=&competitionIds=&isLive=0`;

  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      return errorHandler(res, 404);
    }
    const data = await resp.json();
    return res.json(data);
  } catch (error) {
    errorHandler(res, 500, error);
  }
};

function getCurrentTimeFormatted() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0"); // Add leading zero if needed
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const time = `${hours}:${minutes}:${seconds}`.replace(/:/g, "%3A");
  return time;
}
