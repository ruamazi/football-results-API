import axios from "axios";
import * as cheerio from "cheerio";
import { errorHandler } from "./errorHandler.js";

export const skyAPI = async (req, res) => {
  const url = process.env.SKY_URL;
  try {
    const resp = await axios.get(url);
    const html = resp.data;
    const $ = cheerio.load(html);
    const matches = [];
    $(".fixres__item").each((index, element) => {
      const matchUrl = $(element).find("a").attr("href");
      const teams = {
        home: $(element)
          .find(".matches__participant--side1 .swap-text__target")
          .text()
          .trim(),
        away: $(element)
          .find(".matches__participant--side2 .swap-text__target")
          .text()
          .trim(),
      };
      const scores = {
        home: $(element)
          .find(".matches__teamscores-side:first-child")
          .text()
          .trim(),
        away: $(element)
          .find(".matches__teamscores-side:last-child")
          .text()
          .trim(),
      };
      matches.push({ matchUrl, teams, scores });
    });
    res.json(matches);
  } catch (error) {
    errorHandler(res, 500, error);
  }
};
