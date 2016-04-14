var mongoose = require("./connection");
var seedData = require("./seeds");

var Candidate = mongoose.model("Candidate");
console.log("Seeding db...");

Candidate.remove({}).then(function(){
  Candidate.collection.insert(seedData).then(function(){
    process.exit();
  });
});
