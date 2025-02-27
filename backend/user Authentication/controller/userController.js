const UserModule = require("../modules/userModule");
const bcrypt = require("bcrypt");
const { genrateToken } = require("../utils/generateToken");

exports.userRegister = async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "enter full details" });
  }

  try {
    const emailCheck = await UserModule.findOne({ email });
    if (emailCheck) {
      return res
        .status(400)
        .json({ success: false, message: "email already used" });
    }

    const hassPass = await bcrypt.hash(password, 10);

    const user = await UserModule.create({
      fullName,
      email,
      password: hassPass,
    });
    return res
      .status(200)
      .json({ success: true, message: "Registed successfully", user });
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .json({ success: false, message: "internal server issue" });
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "enter full details" });
  }

  try {
    const checkUser = await UserModule.findOne({ email });
    if (!checkUser) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, checkUser.password);
    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, message: "email / password isWrong" });
    }

    const userData = {
      id: checkUser._id,
      fullName: checkUser.fullName,
      email: checkUser.email,
    };

    req.user = userData;

    genrateToken(req, res);
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .json({ success: false, message: "internal server issue" });
  }
};

exports.userProfile = async (req, res) => {
  const uId = req.userId;
  try {
    const user = await UserModule.findById(uId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    return res.status(200).json({ success: true, message: "user info", user });
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .json({ success: false, message: "internal server issue" });
  }
};

exports.userUpdate = async (req, res) => {
  const uId = req.userId;

  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "enter full details" });
  }
  try {
    const hassPass = await bcrypt.hash(password, 10);

    const user = await UserModule.findByIdAndUpdate(
      uId,
      { fullName, email, password: hassPass },
      { new: true }
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "user updated succesfully", user });
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .json({ success: false, message: "internal server issue" });
  }
};

exports.userDelete = async (req, res) => {
  const uId = req.userId;

  try {
    const user = await UserModule.findByIdAndDelete(uId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "user deleted succesfully", user });
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .json({ success: false, message: "internal server issue" });
  }
};
