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
    await addTeamLogosToMatchData(data);
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

async function addTeamLogosToMatchData(data) {
  const baseLogoUrl = "https://prod-media.beinsports.com/image/";

  for (let matchKey in data) {
    for (let matchId in data[matchKey]) {
      let match = data[matchKey][matchId];

      let resp1;
      let resp2;
      if (!match.match_id || match.match_id === "") {
        const home_resp = await fetch(
          `${baseLogoUrl}${match.home_team_id}.png?ver=28-06-2024`
        );
        resp1 = home_resp;
        const away_resp = await fetch(
          `${baseLogoUrl}${match.away_team_id}.png?ver=28-06-2024`
        );
        resp2 = away_resp;
      }
      if (match.home_team_id) {
        if (resp1 && resp1.status !== 200) {
          match.home_team_logo_url = "";
        } else {
          match.home_team_logo_url = `${baseLogoUrl}${match.home_team_id}.png?ver=28-06-2024`;
        }
      }
      if (match.away_team_id) {
        if (resp2 && resp2.status !== 200) {
          match.away_team_logo_url = "";
        } else {
          match.away_team_logo_url = `${baseLogoUrl}${match.away_team_id}.png?ver=28-06-2024`;
        }
      }
    }
  }

  return data;
}
