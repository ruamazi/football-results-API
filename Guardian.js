import * as cheerio from "cheerio";
import { errorHandler } from "./errorHandler.js";

export const guardianAPI = async (req, res) => {
  const url = process.env.GUARDIAN_URL;
  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      return errorHandler(res, 404);
    }
    const html = await resp.text();
    const $ = cheerio.load(html);
    const matches = [];
    $(".football-matches__day").each((index, day) => {
      const date = $(day).find(".date-divider").text().trim();
      const competition = $(day).find(".table__caption a").text().trim();
      const competitionUrl =
        "https://www.theguardian.com/" +
        $(day).find(".table__caption a").attr("href");

      $(day)
        .find(".football-match")
        .each((index, match) => {
          const matchData = {
            date,
            competition,
            competitionUrl,
            homeTeam: $(match)
              .find(".football-match__team--home .team-name__long")
              .text()
              .trim(),
            homeScore: $(match)
              .find(".football-match__team--home .football-team__score")
              .text()
              .trim(),
            awayTeam: $(match)
              .find(".football-match__team--away .team-name__long")
              .text()
              .trim(),
            awayScore: $(match)
              .find(".football-match__team--away .football-team__score")
              .text()
              .trim(),
            matchStatus: $(match).find(".football-match__status").text().trim(),
            matchLink: $(match).attr("data-link-to"),
            matchId: $(match).attr("data-match-id"),
          };

          matches.push(matchData);
        });
    });

    return res.status(200).json(matches);
  } catch (error) {
    errorHandler(res, 500, error);
  }
};
