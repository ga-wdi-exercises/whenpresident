var mongoose = require("mongoose");

var CandidateSchema = new mongoose.Schema(
  {
    name: String,
    year: Number
  }
); // end candidate schema

mongoose.model("Candidate", CandidateSchema);
mongoose.connect("mongodb://localhost/whenpresident");

module.exports = mongoose;
