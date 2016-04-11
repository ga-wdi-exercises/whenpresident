var express = require("express");
var hbs     = require("express-handlebars");
var db      = require("./db/connection");
var mongoose = require("mongoose");
var parser = require("body-parser");
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
    res.render("candidates-index", {
      candidates: candidates
    });
  })
});

app.get("/candidates/:name", function(req, res){
  Candidate.findOne({name: req.params.name}).then(function(candidate){
    res.render("candidates-show", {
      candidate: candidate
    });
  })
});

app.post('/candidates', function(req, res){
  Candidate.create(req.body.candidate).then(function(candidate){
    res.redirect("/candidates/" + candidate.name)
  })
})

app.post('/candidates/:name', function(req, res){
  Candidate.findOneAndUpdate({name: req.params.name}, req.body.candidate, {new: true}).then(function(candidate){
    res.redirect("/candidates/" + candidate.name)
  })
})

// app.delete('/candidates/:name', function(req, res){
//   Candidate.remove({name: req.params.name}).then(function(){
//     res.redirect("/candidates/")
//   })
// })

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
