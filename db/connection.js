var mongoose = require('mongoose');

var CandidateSchema = new mongoose.Schema({
  name: String,
  year: Number
});

mongoose.model("Candidate", CandidateSchema);
//creates model, names it, and points schema to it.
mongoose.connect("mongodb://localhost/whenpresident")
//add name of database at end of path for database connection

module.exports = mongoose;
