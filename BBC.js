import { getCurrentDate } from "./getCurrentDate.js";

export const BBCAPI = async (req, res) => {
  const todayDate = getCurrentDate();
  const url = `${process.env.BBC_DATA_URL}selectedEndDate=${todayDate}&selectedStartDate=${todayDate}&todayDate=${todayDate}&urn=urn%3Abbc%3Asportsdata%3Afootball%3Atournament-collection%3Acollated`;
  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      return res.status(404).json({ error: "Data not found" });
    }
    const data = await resp.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
