var express  = require("express");
var hbs      = require("express-handlebars");
var mongoose = require("./db/connection");
var parser = require("body-parser");
var Candidate = mongoose.model("Candidate");

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

app.get("/candidates/:name", function(req, res){
  var desiredName = req.params.name;
  Candidate.findOne({name: desiredName}).then(function(candidate) {
    res.render("candidates-show", {
      candidate: candidate
    });
  });
});

app.post("/candidates", function(req, res) {
  Candidate.create(req.body.candidate).then(function() {
    res.redirect("/candidates");
  });
});

app.post("/candidates/:name", function(req, res) {
  Candidate.findOneAndUpdate(req.body.candidate).then(function(candidate) {
    res.redirect("/candidates/" + candidate.name);
  });
});

app.post("/candidates/:name/delete", function(req, res) {
  Candidate.findOneAndRemove({name: req.params.name}).then(function() {
    res.redirect("/candidates");
  });
});

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
