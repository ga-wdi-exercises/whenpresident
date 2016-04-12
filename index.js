var express = require("express");
var parser = require("body-parser");
var hbs     = require("express-handlebars");
var mongoose      = require("./db/connection");

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

//controller behavior

//show all candidates in candidates-index.hbs
app.get("/candidates", function(req, res){
  Candidate.find({}).then(function(candidates){
    res.render("candidates-index", {
      candidates: candidates
    });
  });
});

//show individual candidates
app.get("/candidates/:name", function(req, res){
  Candidate.findOne({name: req.params.name}).then(function(candidate){
    res.render("candidates-show", {
      candidate: candidate
    });
  });
});

//add a candidate
app.post("/candidates", function(req, res){
  Candidate.create(req.body.candidate).then(function(candidate){
    res.redirect("/candidates/" + candidate.name);
  });
});

// edit a candidate
app.post("/candidates/:name", function(req, res){
  Candidate.findOneAndUpdate({name: req.params.name}, req.body.candidate, {new: true}).then(function(candidate){
    res.redirect("/candidates/" + candidate.name);
  });
});

// delete a candidate
app.post("/candidates/:name/delete", function(req, res){
  Candidate.findOneAndRemove({name: req.params.name}).then(function(){
    res.redirect("/candidates");
  });
});

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
