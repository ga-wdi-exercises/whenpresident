var express = require("express");
var hbs     = require("express-handlebars");
var db      = require("./db/connection");

var app     = express();

app.set("port", process.env.Port || 3001);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));
app.use("/assets", express.static("public"));

app.get("/", function(req, res){
  res.render("app-welcome");
});
app.get("/candidates", function(req, res){
  res.render("candidates-index", {
    candidates: db.candidates
  });
});

app.get("/candidates/:name", function(req, res){
  var data = {
    name: req.params.name,
    year: 2016
  }
  var desiredName = req.params.name;
  var candidateOutput;
  db.candidates.forEach(function(candidate){
    if(desiredName === candidate.name){
      candidateOutput = candidate;
    }
  });
  res.render("candidates-show", {
    candidate: candidateOutput
  });
});

app.listen(app.get("port"), function(){
  console.log("It's aliiiiive!");
});
