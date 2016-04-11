var mongoose = require("mongoose");
mongoose.connect("mongod://localhost/whenpresident");

var db = mongoose.connection;

db.on("error", function(error){
  console.log(error);
});

db.once("open", function(){
  console.log("You are connected!!")
});
//======connection stuff above this line======
var CandidiateSchema = new Schema ({
  name: String,
  year: Number,
});

mongoose.model("Candidate", CandidateSchema);

var seedData = require("./seeds.json");
module.exports = {
  candidates: seedData
};
//references the top of the page variable
module.exports = mongoose;
