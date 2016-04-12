var mongoose = require("mongoose");  //variable that utilizes mongoose library//

var CandidateSchema = new mongoose.Schema(
    {
      name: String,
      year: Number
    }
);

mongoose.model("Candidate", CandidateSchema);

//connect to database via url//
mongoose.connect("mongodb://localhost/whenpresident");

// var seedData = require("./seeds.json");  Removed due to seed.js file instructions//
module.exports = mongoose;  //This connects this variable mongoose to the mongoose variable defined in the seed.js file.//

// {            ///set to mongoose//
//   candidates: seedData
// };
