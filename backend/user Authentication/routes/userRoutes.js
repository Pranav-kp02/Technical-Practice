const express = require("express");
const {
  userRegister,
  userLogin,
  userProfile,
  userUpdate,
  userDelete,
} = require("../controller/userController");
const { userAutherication } = require("../middleware/ath");
const userRoute = express.Router();

userRoute.route("/reg").post(userRegister);
userRoute.route("/log").post(userLogin);
userRoute
  .route("/prof")
  .get(userAutherication, userProfile)
  .put(userAutherication, userUpdate)
  .delete(userAutherication, userDelete);

module.exports = userRoute;
