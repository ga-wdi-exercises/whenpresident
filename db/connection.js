var mongoose = require("mongoose");

var CandidatesSchema = new mongoose.Schema(
  {
    name: String,
    year: Number
  }

);

mongoose.model("Candidate", CandidateSchema);
mongoose.connect("mongodb://localhost/whenpresident");

module.exports = mongoose;
