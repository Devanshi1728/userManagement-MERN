const userModel = require("../models/userModel");

exports.getUserData = async (req, res, next) => {
  const userData = await userModel
    .find()
    .collation({ locale: "en" })
    .sort({ name: -1 });
  if (!userData) {
    return next("No data found");
  }
  res.status(200).send(userData);
};

exports.getUserSearchData = async (req, res, next) => {
  const { key } = req.params;
  const userData = await userModel.find({
    $or: [
      { name: { $regex: key } },
      { email: { $regex: key } },
      { mobile: { $regex: key } },
    ],
  });
  if (!userData) {
    return next("No data found");
  }
  res.status(200).send(userData);
};

exports.addUserData = async (req, res, next) => {
  try {
    const { name, email, mobile, dob } = req.body;
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return next("Email already exist");
    }
    const user = await userModel.create({ name, email, mobile, dob });
    res.status(201).json({ data: user, message: "User Added", success: true });
  } catch (error) {
    res.status(403).json({ message: "User not Added", success: false });
  }
};

exports.editUserData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndUpdate(id, {
      $set: req.body,
    });
    if (user) {
      const data = { ...req.body };
      res.status(200).send(data);
    } else {
      next("No user for given id");
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteUserData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await userModel.findByIdAndRemove(id);
    if (data) {
      res.status(200).json({
        data: data,
        message: "User deleted successfuly",
        success: true,
      });
    }
  } catch (error) {
    next(error);
  }
};
