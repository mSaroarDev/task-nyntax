const connectDB = require("../db/connectDB");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// create new user
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    await connectDB();
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(406).json({ msg: "user exist" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const data = new userModel({
      ...req.body,
      password: hashedPassword,
    });

    await data.save();
    res.status(201).json({ msg: "success", data: "data saved" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ msg: "error", error: error });
  }
};

// login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    await connectDB();

    const existUser = await userModel.findOne({ email });
    if (!existUser) {
      return res.status(401).json({ msg: "user not found" });
    }

    const isValidPassword = await bcrypt.compare(password, existUser.password);
    if (!isValidPassword) {
      return res.status(401).json({ msg: "authentication failed" });
    }

    if (existUser && isValidPassword) {
      // generate token
      const token = jwt.sign(
        {
          id: existUser._id.toString(),
          email: email,
          userName: existUser.userName,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      // set token to cookie
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        sameSite: "none",
        secure: true,
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
      });
      res.status(200).json({
        msg: "success",
        data: existUser.email,
      });
    } else {
      res.status(401).json({ msg: "authencation failed" });
    }
  } catch (error) {
    res.status(500).json({ msg: "authencation failed" });
  }
};

// verify user
const verifyUser = async (req, res) => {
  try {
    res.status(200).json({ msg: true, data: "user verified" });
  } catch (error) {
    res.status(500).json({ msg: false, data: "user unauthorized" });
  }
};

// // logout
// const logout = async (req, res) => {
//   try {
//     // set user as active now
//     await userModel.findOneAndUpdate(
//       { _id: req.id },
//       {
//         $set: {
//           isActive: false,
//           lastActivity: new Date(Date.now()),
//         },
//       }
//     );

//     // remove cookie
//     res.clearCookie("token");
//     res.status(200).json({ msg: "success", data: "logged out" });
//   } catch (error) {
//     res.status(500).json({ msg: "authencation failed" });
//   }
// };

module.exports = { registerUser, login, verifyUser };
