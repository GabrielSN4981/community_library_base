import express from "express";
import { router } from "./src/routers/index.js";
import "dotenv/config";
import "./src/services/cron.service.js";

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
