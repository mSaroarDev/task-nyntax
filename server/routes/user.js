const express = require("express");
const router = express.Router();
// const checkAuth = require("../middlewares/checkAuth");
const { registerUser, login } = require("../controllers/user");

// api's
router.post("/register", registerUser);
router.post("/login", login);
// router.get("/login",  verifyUser);
// router.get("/:id", checkAuth, getNoticeDetails);
// router.delete("/delete/:id", checkAuth, deleteNotice);
// router.post("/edit/:id", checkAuth, editNotice);

module.exports = router;
