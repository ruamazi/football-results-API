import "dotenv/config";
import express from "express";
import { BBCAPI } from "./BBC.js";
import { SkyAPI } from "./SKY.js";

const app = express();
const port = process.env.PORT || 3038;

app.get("/bbc", BBCAPI);
app.get("/sky", SkyAPI);

app.get("/", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
