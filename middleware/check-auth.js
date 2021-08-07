const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // console.log("authpage",token);
    const decodedToken = jwt.verify(token, "A_very_long_string_for_our_secret");
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    //  console.log("req.userData ",req.userData )
    next();
  } catch (err) {
    // console.log("authErr", err);
    res.status(401).json({
      message: "You Are Not Authenticated! ",
    });
  }
};
