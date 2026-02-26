const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json()); // 🔴 REQUIRED to add movies

const moviesPath = path.join(__dirname, "movies.json");

// Helper function to read movies fresh every time
function readMovies() {
  return JSON.parse(fs.readFileSync(moviesPath, "utf-8"));
}

// Test route
app.get("/", (req, res) => {
  res.send("OTT Backend Running");
});

// GET movies
app.get("/movies", (req, res) => {
  const movies = readMovies();
  res.json(movies);
});

// ADD movie (NEW 🔥)
app.post("/movies", (req, res) => {
  const movies = readMovies();

  const newMovie = {
    id: movies.length + 1,
    title: req.body.title,
    thumbnail: req.body.thumbnail,
    video: req.body.video
  };

  movies.push(newMovie);

  fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2));

  res.status(201).json(newMovie);
});

// Start server (INTERNET SAFE)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Backend running on port " + PORT);
});
