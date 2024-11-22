import "dotenv/config";
import express from "express";
import { bbcAPI } from "./bbc.js";
import { skyAPI } from "./sky.js";
import { errorHandler } from "./errorHandler.js";
import * as cheerio from "cheerio";
import { guardianAPI } from "./Guardian.js";

const app = express();
const port = process.env.PORT || 3038;

app.get("/bbc", bbcAPI);
app.get("/sky", skyAPI);
app.get("/guardian", guardianAPI);

app.get("/", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
