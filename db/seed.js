var seedData = require("./seeds.json");
var Candidate = require("./connection");

Candidate.remove({}).then(function() {
    Candidate.collection.insert(seedData).then(function() {
        process.exit();
    });
});
