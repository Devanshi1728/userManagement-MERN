const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  mobile: {
    type: String,
    required: [true, "Mobile is required"],
    minLength: [10, "Password should be of 10 digit"],
    maxLength: [10, "no should have maximum 10 digits"],
    match: [/\d{10}/, "no should only have digits"],
  },
  dob: {
    type: Date,
    required: [true, "DOB is required"],
    trim: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
