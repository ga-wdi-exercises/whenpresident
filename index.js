var express = require("express");
var hbs = require("express-handlebars");
var mongoose = require("./db/connection");

var app = express();

var Candidate = mongoose.model("Candidate");

app.set("port", process.env.PORT || 3001);
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
  Candidate.find({}).then(function(candidates){
    res.render("candidates-index", {
      candidates: candidates
    });
  });
});

app.get("/candidates/:name", function(req, res){
  Candidate.findOne({req.params.name}).then(function(candidate){
    res.render("candidates-show", {
      candidate: candidate
    });
  });
});

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
