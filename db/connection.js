var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/whenpresident");

// var db = mongoose.connection;
//
// db.on('error', function(error){
//   console.log(error);
// });
//
// db.once('open', function(){
//   console.log("You are connected!!")
// });
var CandidateSchema = new mongoose.Schema ({
  name: String,
  year: Number,
});

mongoose.model("Candidate", CandidateSchema);

module.exports = mongoose;
