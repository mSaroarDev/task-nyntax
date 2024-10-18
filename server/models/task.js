const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
      default: "incomplete",
    },
    created_by: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const taskModel = new mongoose.model("Task", taskSchema);
module.exports = taskModel;
