const express = require("express");
const router = express.Router();
const path = require("path");

const {
  getAllNotes,
  createNote,
  deleteNote,
  updateNote,
} = require("../controllers/notesController");

router.get("^/$/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.route("/notes/").get(getAllNotes);
router.route("/notes/").post(createNote);
router.route("/notes/:id").delete(deleteNote);
router.route("/notes/:id").put(updateNote);

module.exports = router;
