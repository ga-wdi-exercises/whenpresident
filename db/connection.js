var mongoose = require("mongoose");

var CandidateSchema = new mongoose.Schema({
  name: String,
  year: Number
});

mongoose.model("Candidate", CandidateSchema);
mongoose.connect("mongodb://localhost/whenpresident");

module.exports = mongoose;
