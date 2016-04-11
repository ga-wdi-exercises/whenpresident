var mongoose = require("./connection");
var SeedData = require("./seeds.json");

var Candidate = mongoose.model("Candidate")

Candidate.remove({}).then(function(){
  Candidate.collection.insert(seedData)
});
