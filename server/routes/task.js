const express = require("express");
const router = express.Router();
// const checkAuth = require("../middlewares/checkAuth");
const {
  createTask,
  getTasks,
  deleteTask,
  completeTask,
  editTask,
  getTask,
} = require("../controllers/task");

// api's
router.post("/create", createTask);
router.get("/my-tasks/:email", getTasks);
router.get("/delete/:id", deleteTask);
router.get("/mark-complete/:id", completeTask);
router.patch("/edit/:id", editTask);
router.get("/:id", getTask);
// router.post("/login", login);
// router.get("/login",  verifyUser);
// router.get("/:id", checkAuth, getNoticeDetails);
// router.delete("/delete/:id", checkAuth, deleteNotice);
// router.post("/edit/:id", checkAuth, editNotice);

module.exports = router;
