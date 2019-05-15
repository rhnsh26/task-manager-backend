const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost:27017/work-todo", {
//   useNewUrlParser: true
// });

mongoose.connect(
  "mongodb://rhn:buttowski1234@ds113375.mlab.com:13375/work-todo",
  {
    useNewUrlParser: true
  }
);

module.exports = { mongoose };
