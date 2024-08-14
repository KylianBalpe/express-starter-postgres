import express from "express";
import cors from "cors";

export const app = express();

app.use(cors());

app.get("/v1", (req, res) => {
  res.send("Hello, World!");
});
