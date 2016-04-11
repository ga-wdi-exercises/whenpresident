var mongoose = require("./connection");
var seedData = require("./seeds");

var Candidate = mongoose.model("Candidate");

Candidate.remove({}).then(function(){
  //put this method inside remove() to make sure code runs in order you want bc of asynchronicity
  Candidate.collection.insert(seedData).then(function(){
    process.exit();
  });
})
