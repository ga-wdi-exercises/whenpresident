var express = require("express");
var parser  = require("body-parser");
var mongoose= require("./db/connection");

var app     = express();


app.set("port", process.env.PORT || 3001);
var Candidate = mongoose.model("Candidate");

app.use("/public", express.static("public"));
app.use(parser.json({extended: true}));

app.get("/api/candidates", function(req, res){
  Candidate.find({}).then(function(candidates){
    res.json(candidates);
  });
});

app.get("/api/candidates/:name", function(req, res){
  Candidate.findOne({name: req.params.name}).then(function(candidate){
    res.json(candidate);
  });
});

app.post("/api/candidates", function(req, res){
  Candidate.create(req.body.candidate).then(function(candidate){
    res.json(candidate);
  });
});

app.delete("/api/candidates/:name", function(req, res){
  Candidate.findOneAndRemove({name: req.params.name}).then(function(){
    res.json({success: true});
  });
});

app.put("/api/candidates/:name", function(req, res){
  Candidate.findOneAndUpdate({name: req.params.name}, req.body.candidate, {new: true}).then(function(candidate){
    res.json(candidate);
  });
});

app.get("/*", function(req, res){
  res.sendFile(__dirname + "/views/main.html");
});

app.listen(app.get("port"), function() {
console.log("N");
});
