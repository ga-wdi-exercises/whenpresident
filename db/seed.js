//You need ./ - that means it looks for a specific file.//
var mongoose = require("./connection");

var seedData = require("./seeds.json");

var Candidate = mongoose.model("Candidate");  //get candidate model from mongoose.  "Candidate" has to match the model name in the connection.js file. (from line 14)//

Candidate.remove({}).then(function() {  //since the object is empty, this method removes everything//
  Candidate.collection.insert(seedData).then(function() {
    process.exit();   //After doing node [file_name], Once data is imported, stop.//
  });
});
//The purpose of the .then function is to ensure .remove occurs before .insert.  These functions are asynchronous, so you want the database to be empty before you add seed data.//

//You don't want your seed data in the connection.js file; otherwise, your database will re-seed each time you connect.//
