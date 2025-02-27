const User = require("../modules/userShema");

exports.userRegister = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "enter full details",
    });
  }

  try {
    const user = await User.create({
      fullName,
      email,
      password,
    });
    res.status(200).json({
      success: true,
      message: "Registered succesfully",
      user,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getUserDetails = async (req, res) => {
  const { uId } = req.params;

  if (!uId) {
    return res.status(400).json({ message: "pls login " });
  }

  const userData = await User.findById(uId);
  if (!userData) {
    return res.status(400).json({ message: "inValid user" });
  }
  res.status(200).json({
    success: true,
    userData,
  });
};

exports.updateUserDetails = async (req, res) => {
  const { uId } = req.params;
  const { fullName, email, password } = req.body;

  if (!uId) {
    return res.status(400).json({ message: "pls login again" });
  }

  const userUpdate = await User.findByIdAndUpdate(
    uId,
    { fullName, email, password },
    { new: true }
  );
  await userUpdate.save();

  res.status(200).json({ message: "updated succesfully", userUpdate });
};

exports.deleteUserDetails = async (req, res) => {
  const { uId } = req.params;
  if (!uId) {
    res.status(400).json({ message: "pls login" });
  }

  const user = await User.findByIdAndDelete(uId);
  if (!user) {
    res.status(400).json({ message: "user invalid" });
  }

  res.status(200).json({ message: "user deleted successfully" });
};
