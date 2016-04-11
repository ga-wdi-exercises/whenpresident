//it is important that this file name be singular

var mongoose = require("./connection");
//reference seed data in json file
var seedData = require("./seeds");
//define a candidate model
var Candidate = mongoose.model("Candidate");

//clear database before seeding, write seed process as callback
Candidate.remove({}).then(function(){
  Candidate.collection.insert(seedData).then(function(){
    process.exit(); //close out process
  })
})
