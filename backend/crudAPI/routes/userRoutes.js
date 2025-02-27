const express = require("express");
const {
  userRegister,
  getUserDetails,
  updateUserDetails,
  deleteUserDetails,
} = require("../controllers/userController");
const userRoute = express.Router();

userRoute.route("/register").post(userRegister);
userRoute.route("/profile/:uId").get(getUserDetails);
userRoute.route("/update/:uId").put(updateUserDetails);
userRoute.route("/delete/:uId").delete(deleteUserDetails);

module.exports = userRoute;
