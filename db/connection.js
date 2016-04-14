var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/whenpresident");

var CandidateSchema = new mongoose.Schema(
  {
    name: String,
    year: Number
  }
);


mongoose.model("Candidate", CandidateSchema);

module.exports = mongoose
