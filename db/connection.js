var mongoose = require("mongoose");

var CandidateSchema = new mongoose.Schema({
  name: String,
  year: Number
});

//tying to our model
mongoose.model("Candidate", CandidateSchema);
//connecting to database
mongoose.connect("mongodb://localhost/whenpresident")

//going to create a sep seed file
// var seedData = require("./seeds.json");
// module.exports = {
//   candidates: seedData
// };

//can now reference mongoose in other files
module.exports = mongoose;
