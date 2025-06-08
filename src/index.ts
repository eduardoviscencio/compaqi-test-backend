import express from "express";
import cors from "cors";

import { dbConnection } from "./config/database.config";

import { locationsRouter } from "./routes";

dbConnection();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use("/api/locations", locationsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
