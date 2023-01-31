const asyncHandler = require("express-async-handler");
const Notes = require("../model/Notes");
const { Op } = require("sequelize");

const getAllNotes = asyncHandler(async (req, res) => {
  try {
    const data = await Notes.findAll();
    if (!data) {
      res.status(400).json({ message: "Sorry, there are no notes" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const createNote = asyncHandler(async (req, res) => {
  try {
    const { title, details } = req.body;

    if (!title || !details) {
      res.status(400).json({ message: "Please complete the data" });
    }

    const newNote = await Notes.create({
      title,
      details,
    });
    res.status(201).json({ message: newNote.title + "added!" });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const deleteNote = asyncHandler(async (req, res) => {
  try {
    const delNote = await Notes.findByPk(req.params.id);
    if (!delNote) {
      res.status(400).json({ message: "No event found!" });
    }

    await Notes.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(201).json({ message: `Note ${req.params.id} deleted!` });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const updateNote = asyncHandler(async (req, res) => {
  console.log(req.body);
  const update = await Notes.findByPk(req.params.id);
  try {
    if (!update) {
      return res
        .status(400)
        .json({ message: `Sorry, that note could not be found` });
    }
    const updatedNote = await Notes.update(
      {
        title: req.body.title,
        details: req.body.details,
      },
      {
        returning: true,
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(202).json({ message: `Note ${req.params.id} has been updated` });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = {
  getAllNotes,
  createNote,
  deleteNote,
  updateNote,
};
