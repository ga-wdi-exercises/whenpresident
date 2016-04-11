var mongoose = require("mongoose"); //so we can reference it in the other files

var CandidateSchema = new mongoose.Schema(
  {
    name: String,
    year: Number
  }
); // this doesn't do anything yet until we define more things

mongoose.model("Candidate", CandidateSchema); // this model is modeled after CandidateSchema
mongoose.connect("mongodb://localhost/whenpresident") //whenpresident is the name of database we're using


module.exports = mongoose; //can use mongoose methods anywhere else in the application as long as it requires the connection.js file
