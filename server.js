const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());

// Load movies.json
const moviesPath = path.join(__dirname, "movies.json");
const movies = JSON.parse(fs.readFileSync(moviesPath, "utf-8"));

// Test route
app.get("/", (req, res) => {
  res.send("OTT Backend Running");
});

// Movies API
app.get("/movies", (req, res) => {
  res.json(movies);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Backend running at http://localhost:" + PORT);
});