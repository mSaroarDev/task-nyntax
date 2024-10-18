const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//  initialize the app
const app = express();

// configure dotenv and cors
dotenv.config();
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// routes
app.get("/", (req, res) => {
  res.send(`Server started at port ${process.env.PORT || 8000}`);
});

// import routes
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");

// user
app.use("/user", userRouter);
app.use("/task", taskRouter);

// start the server
app.listen(process.env.PORT || 8000, () => {
  console.log(`Server started at port ${process.env.PORT || 8000}`);
});
