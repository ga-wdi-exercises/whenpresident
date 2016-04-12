var express = require("express");
var parser  = require("body-parser");
var hbs     = require("express-handlebars");
var Candidate = require("./db/connection").CandidateModel;

var app     = express();

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));
app.use("/assets", express.static("public"));
app.use(parser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.render("app-welcome");
});

app.get("/candidates", function(req, res){
  Candidate.find({}).then(function(candidates) {
    res.render("candidates-index", {
      candidates: candidates
    });
  });
});

app.post("/candidates", function(req, res) {
  Candidate.create(req.body.candidate).then(function() {
    res.redirect("/candidates");
  });
});

app.get("/candidates/:name", function(req, res){
  var desiredName = req.params.name;
  var candidateOutput;
  Candidate.find({}).then(function(candidates) {
    candidates.forEach(function(candidate){
      if(desiredName === candidate.name){
        candidateOutput = candidate;
      }
    });
    res.render("candidates-show", {
      candidate: candidateOutput
    });
  });
});

app.post("/candidates/:name/delete", function(req, res) {
  Candidate.findOneAndRemove({name: req.params.name}).then(function() {
    res.redirect("/candidates");
  });
});

app.post("/candidates/:name/", function(req, res) {
  var name = req.params.name;
  Candidate.findOneAndUpdate({name: name}, req.body.candidate, {new: true})
  .then(function(candidate) {
    res.redirect("/candidates/" + candidate.name);
  });
});

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
