var express = require("express");
var hbs     = require("express-handlebars");
var mongoose= require("./db/connection");
var parser  = require("body-parser");

var app     = express();

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
app.use(parser.urlencoded({extended: true}));
app.get("/", function(req, res){
  res.render("app-welcome");
});

app.get("/candidates", function(req, res){
  Candidate.find({}).then(function(candidates){
    res.render("candidates-index",{
      candidates: candidates
    });
  });
});

app.post("/candidates/:name/delete", function(req, res){
  Candidate.findOneAndRemove({name: req.params.name}).then(funtion(){
    res.redirect("/candidates")
  });
});

app.get("/candidates/:name", function(req, res){
  Candidate.findOne({name: req.params.name}).then(function(candidate){
    res.render("candidates-show", {
      candidate: candidate
    });
  });
});

app.post("/candidates", function(req, res){
  Candidate.create(req.body.candidate).then(function(candidate){
    res.redirect("/candidates/" + candidate.name);
  });
});

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
