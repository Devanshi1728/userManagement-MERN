const express = require("express");
const {
  addUserData,
  getUserData,
  editUserData,
  deleteUserData,
  getUserSearchData,
} = require("../controllers/userController");

const router = express.Router();

router.post("/user/add", addUserData);
router.get("/user", getUserData);
router.get("/user/:key", getUserSearchData);
router.put("/edit/:id", editUserData);
router.delete("/delete/:id", deleteUserData);

module.exports = router;
