const express = require("express");
const fetchUser = require("../middleware/fetchuser");
const router = express.Router();
const Tasks = require("../models/Tasks");
const { body, validationResult } = require("express-validator");

// Routes1: get all the task
router.get("/fetchalltask", fetchUser, async (req, res) => {
  const tasks = await Tasks.find({ user: req.user.id });
  res.json(tasks);
});

// Routes2: add task to mongodb with post api
router.post(
  "/addtask",
  fetchUser,
  [
    body("title").isLength({ min: 5 }),
    body("description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description } = req.body;
      // if there is a error return a bad status
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
      }
      const tasks = new Tasks({
        title,
        description,
        user: req.user.id,
      });
      const saveNote = await tasks.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//  Routes3: update an existing task
router.put("/updatetask/:id", fetchUser, async (req, res) => {
  const { title, description, status } = req.body;
  //create a newNote object
  const newNote = {};
  if (title) newNote.title = title;
  if (description) newNote.description = description;
  if (status) newNote.status = status;

  // Find the note to be updated and update it

  const tasks = await Tasks.findById(req.params.id);
  if (!tasks) return res.status(404).send("Not Found");
  if (tasks.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }
  const note = await Tasks.findOneAndUpdate(
    req.param.id,
    { $set: newNote },
    { new: true }
  );
  res.json({ note });
});

// Routes4: delete an existing task
router.delete("/deletetask/:id", fetchUser, async (req, res) => {
  try {
    // find the note to be deleted
    let note = await Tasks.findById(req.params.id);
    if (!note) return res.status(404).send("Not Found");

    // Allow deletion only if user owns this Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Tasks.findByIdAndDelete(req.params.id);

    res.json({ success: "Note has been deleted" });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
