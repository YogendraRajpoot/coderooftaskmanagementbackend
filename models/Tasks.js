const mongoose = require("mongoose");
const { Schema } = mongoose;

const TasksSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "in progress",
  },
  dueDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Tasks", TasksSchema);
