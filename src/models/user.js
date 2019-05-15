const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email Id is not a valid email address");
        }
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

userSchema.virtual("mytodos", {
  ref: "todo",
  localField: "_id",
  foreignField: "userId"
});

userSchema.methods.toJSON = function() {
  let userDoc = this;
  let userObject = userDoc.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

userSchema.statics.findByEmail = async (email, password) => {
  let user = await userModel.findOne({ email });
  if (!user) {
    throw new Error("Email is not registered");
  }
  let match = await bcrypt.compare(password, user.password);
  if (match) {
    return user;
  } else {
    throw new Error("Wrong password");
  }
};

userSchema.methods.genToken = async function() {
  let userDoc = this;
  let token = jwt.sign({ _id: userDoc._id.toString() }, "rohan", {
    expiresIn: "1 day"
  });
  userDoc.tokens = userDoc.tokens.concat({ token });
  await userDoc.save();
  return token;
};

userSchema.pre("save", async function(next) {
  let userDoc = this;
  if (userDoc.isModified("password")) {
    userDoc.password = await bcrypt.hash(userDoc.password, 8);
  }
  next();
});

const userModel = mongoose.model("users", userSchema);

module.exports = { userModel };
