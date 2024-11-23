const express = require("express");
const Notes = require("../models/Notes");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// Route 1: Fetch all notes
router.get("/fetchallnotes", async (req, res) => {
  try {
    // Sort by pinned status (true first) and then by date (most recent first)
    const notes = await Notes.find().sort({
      pinned: -1, // Descending order for pinned
      date: -1, // Descending order for date
    });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 2: Pin/unpin a note
router.put("/pin/:id", async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    // Toggle the pinned status
    note.pinned = !note.pinned;
    const updatedNote = await note.save();
    res.json({ success: true, note: updatedNote });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 3: Add a new note
router.post(
  "/addnote",
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const note = new Notes({
        title,
        description,
        tag,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 4: Update an existing note
router.put("/updatenote/:id", async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 5: Delete a note
router.delete("/deletenote/:id", async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ note: note, success: "Note deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
