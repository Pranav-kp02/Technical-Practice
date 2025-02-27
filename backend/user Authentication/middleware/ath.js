const jwt = require("jsonwebtoken");

exports.userAutherication = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(404).json({ success: false, message: "invalid token" });
  }

  let secreteKey = "favrvibevibviuwbvibwb";
  jwt.verify(token, secreteKey, (err, decode) => {
    if (err) {
      return res.status(404).json({ success: false, message: "invalid token" });
    }

    req.userId = decode.id;
    next();
  });
};
