const jwt = require("jsonwebtoken");

exports.genrateToken = (req, res) => {
  const option = {
    id: req.user.id,
    time: Date.now(),
  };

  let secreteKey = "favrvibevibviuwbvibwb";
  const token = jwt.sign(option, secreteKey, { expiresIn: "30m" });
  if (!token) {
    return res.status(404).json({ success: false, message: "try again" });
  }

  return res.status(200).cookie("token", token).json({
    success: true,
    message: "login successfully",
    user: req.user,
    autherication: true,
    token,
  });
};
