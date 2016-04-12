var mongoose = require("mongoose");
var seedData = require("./seeds.json");
module.exports = {
  candidates: seedData
};

// schema
var CandidateSchema = new mongoose.Schema(
  {
    name: String,
    year: Number
  }
);


mongoose.model("Candidate", CandidateSchema);

// connect via mongo or url
mongoose.connect(process.env.MONGOLAB_URL || "mongodb://localhost/whenpresident");

// this shares the 'mongoose' variable with var mongoose in seed.js
module.exports = mongoose;

// var seedData = require("./seeds.json");

// this exits in the command line automatically when you run it:
// process.exit();
