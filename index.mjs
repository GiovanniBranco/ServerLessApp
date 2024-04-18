
import express from "express";
const app = express();

const correctQuestions = [3, 1, 0, 2];
const previousResults = new Map();

app.post("/api/results", (req, res) => {
  
});

app.get("/api/results/:id", (req, res) => {
  const result = previousResults.get(req.params.id);
  if (!result) {
    return res.status(404).json({ error: "Result not found" });
  }
  res.json(result);
});
