var mongoose = require("./connection");

var seedData = require("./seeds.json");

var Candidate = mongoose.model("Candidate");  //get candidate model from mongoose//

Candidate.remove({}).then(function() {  //since the object is empty, this method removes everything//
  Candidate.collection.insert(seedData).then(function() {
    process.exit();   //Once data is imported, stop.//
  });
});
