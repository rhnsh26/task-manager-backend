const { userModel } = require("../models/user");

const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const key = jwt.verify(token, "rohan");
    const userDoc = await userModel.findOne({
      _id: key._id,
      "tokens.token": token
    });
    if (!userDoc) {
      throw new Error();
    }
    res.locals.user = userDoc;
    res.locals.token = token;
    next();
  } catch (e) {
    res.send("You are not verified");
  }
};

module.exports = auth;
