const mongoose = require("mongoose");

const connectDB = () => {
  // Check if the database is already connected
  if (mongoose.connection.readyState === 1) {
    console.log("DB already connected");
  } else {
    mongoose
      .connect(process.env.DBURL)
      .then(() => {
        console.log("DB connected");
      })
      .catch((err) => console.log(err));
  }
};

module.exports = connectDB;
