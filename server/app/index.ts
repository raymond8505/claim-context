process.env.DOTENV_CONFIG_PATH = "../../.env";
import "dotenv/config";
import express from "express";
import cors from "cors";
// import { apiRequest, config, getArticles } from "../db/crud"

const app = express();
const PORT = process.env.APP_PORT;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.post("/sources", (req, res) => {
  const { subject, title, url, body } = req.body;

  console.log({ subject, title, url, body });

  res.json({});
});
