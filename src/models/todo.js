const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: "No description"
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users"
    },
    completed: {
      type: Boolean,
      default: false
    },
    avatar: {
      type: Buffer
    }
  },
  {
    timestamps: true
  }
);

todoSchema.methods.toJSON = function() {
  const toDoc = this;
  const todObj = toDoc.toObject();
  delete todObj.userId;
  return todObj;
};

const todoModel = mongoose.model("todo", todoSchema);

module.exports = { todoModel };
