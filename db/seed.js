var mongoose = require("./connection"); //taking the mongoose variable from connection.js
var seedData = require("./seeds"); // ./ says look in current directory

var Candidate = mongoose.model("Candidate");

Candidate.remove({}).then(function(){
  Candidate.collection.insert(seedData).then(function(){
    process.exit();
  }) // use then so that candidates are inserted AFTER all candidates are removed
}) // removes all candidates since I'm passing an empty bracket
