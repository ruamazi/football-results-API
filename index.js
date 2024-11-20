import "dotenv/config";
import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import { BBCAPI } from "./BBC.js";

const app = express();
const port = process.env.PORT || 3038;

app.get("/bbc", BBCAPI);

app.get("/status", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
