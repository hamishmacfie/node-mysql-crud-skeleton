const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { inflate } = require("zlib");
const app = express();
const PORT = process.env.PORT || 3800;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
    exposedHeaders: ["authorization"], // you can change the headers
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);

// Routes
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/api/v1/", require("./routes/router"));
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
