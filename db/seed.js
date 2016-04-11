var mongoose = require("./connection");
var seedData = require("./seeds");

var Candidate = mongoose.model("Candidate"); //start using mongoose methods to make change

Candidate.remove({}).then(function(){
  Candidate.collection.insert(seedData).then(function(){
    process.exit();
  });
});
