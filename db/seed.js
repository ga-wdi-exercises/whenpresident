var mongoose = require("./connection");
var seedData = require("./seeds.json");

var Candidate = mongoose.model("Candidate");

// drops and seeds the database in a synchronous order
Candidate.remove({}).then(function(){
  Candidate.collection.insert(seedData).then(function(){
    process.exit(); // exit once data is imported
  });
});
