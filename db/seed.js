var mongoose = require("./connection");
var seedData = require("./seeds.json");

var Candidate = mongoose.model("Candidate");

// drop and seed the database
Candidate.remove({}).then(function(){
  Candidate.collection.insert(seedData).then(function(){
    process.exit(); // exit once data is imported
  });
});
