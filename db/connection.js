var mongoose = require("mongoose");

var CandidateSchema= new mongoose.Schema(
  {
    name: String,
    year: Number
  }
);

mongoose.model("Candidate", CandidateSchema);
// if(process.env.NODE_ENV =='production'){
  mongoose.connect(process.env.MONGOLAB_URL || "mongodb://localhost/whenpresident");
// }else{      **lines 11 and 13 not necessary
// mongoose.connect("mongodb://localhost/whenpresident"); //connect via url
// }

// var seedData = require("./seeds.json");
// module.exports = {
//   candidates: seedData
// };
module.exports = mongoose;
