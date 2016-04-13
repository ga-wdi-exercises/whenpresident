var mongoose = require("./connection");
var seedData = require("./seeds");

var Candidate = mongoose.model("Candidate");  //load up the candidate model that we made
  console.log("Seeding db...");

Candidate.remove({}).then(function(){   //you need the .then for it to be synchronous. be explicit
  Candidate.collection.insert(seedData).then(function(){
    process.exit();  //exit once data is imported
  });
});
