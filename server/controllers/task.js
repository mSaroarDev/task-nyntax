const connectDB = require("../db/connectDB");
const taskModel = require("../models/task");

// create a new task
const createTask = async (req, res) => {
  const formdata = req.body;

  try {
    await connectDB();

    const newData = new taskModel(formdata);
    const data = await newData.save();

    res.status(201).json({ msg: "success", data });
  } catch (error) {
    res.status(500).json({ msg: "error", error });
  }
};

// get all tasks by me
const getTasks = async (req, res) => {
  const { email } = req.params;
  console.log("email", email);

  try {
    await connectDB();
    const data = await taskModel.find({ created_by: email });
    console.log("data", data);

    res.status(200).json({ msg: "success", data });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ msg: "error", error });
  }
};

// get all tasks by me
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await connectDB();
    const data = await taskModel.findByIdAndDelete({ _id: id });
    console.log("data", data);

    res.status(200).json({ msg: "success", data });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ msg: "error", error });
  }
};

// get all tasks by me
const completeTask = async (req, res) => {
  const { id } = req.params;

  try {
    await connectDB();
    const data = await taskModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          status: "completed",
        },
      }
    );
    console.log("data", data);

    res.status(200).json({ msg: "success", data });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ msg: "error", error });
  }
};

// get all tasks by me
const editTask = async (req, res) => {
  const { id } = req.params;
  const formdata = req.body;
  console.log("formdata", formdata);

  try {
    await connectDB();
    const data = await taskModel.findByIdAndUpdate({ _id: id }, formdata);
    console.log("data", data);

    res.status(200).json({ msg: "success", data });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ msg: "error", error });
  }
};

// get task by id
const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    await connectDB();
    const data = await taskModel.findOne({ _id: id });
    console.log("data", data);

    res.status(200).json({ msg: "success", data });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ msg: "error", error });
  }
};

module.exports = {
  createTask,
  getTasks,
  deleteTask,
  completeTask,
  editTask,
  getTask,
};
