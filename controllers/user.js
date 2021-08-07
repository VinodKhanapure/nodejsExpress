const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../model/user");

exports.createUser = ((req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const userr = new user({
        email: req.body.email,
        password: hash,
      });
      userr
        .save()
        .then((result) => {
          
          res.status(201).json({
            message: "User created successfully",
            result: result,
          });
        })
        .catch((err) => {
          // console.log("err", err);
          res.status(500).json({
            message: "Invalid Authentication Credentials !",
          });
        });
    });
  })



  exports.userLogin = (req, res, next) => {
    var fecthedUser
    user
      .findOne({ email: req.body.email })
      .then(user1 => {
        // console.log("user1", user1);
        if (!user1) {
          res.status(401).json({
            message: "Auth failed",
          });
        }
          this.fecthedUser = user1;
        return bcrypt.compare(req.body.password, this.fecthedUser.password);
      })
      .then((result) => {
        if (!result) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        const token = jwt.sign(
          { email: this.fecthedUser.email, userId: this.fecthedUser._id },
          "A_very_long_string_for_our_secret",
          { expiresIn: "1h" }
        );
       
        res.status(200).json({
          token: token,
          message: "Logged in successfully!",
          expiresIn:3600,
          userId:this.fecthedUser.id
        });
      })
      .catch((err) => {
        return res.status(401).json({
          message: "Invalid Authentication Credentials!",
        });
      });
  }