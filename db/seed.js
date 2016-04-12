var mongoose = require("./connection");
var seedData = require("./seeds.json");
console.log("Seeding DB, please hold.");

Candidate = mongoose.model("Candidate");

Candidate.remove({}).then(function(){
  Candidate.collection.insert(seedData).then(function(){
    process.exit();
  });
});
