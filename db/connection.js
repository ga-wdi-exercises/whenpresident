var mongoose = require("mongoose");
mongoose.connect("mongod://localhost/3001");

db.on("error", function(error){
  console.log(error);
});

db.once("open", function(){
  console.log("You are connected!!")
});

var seedData = require("./seeds.json");
module.exports = {
  candidates: seedData
};
