var express = require("express");
var hbs     = require("express-handlebars");
var mongoose = require("./db/connection");
// var db      = require("./db/connection"); **rename db to mongoose

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
app.us(parser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.render("app-welcome");
});

app.get("/candidates", function(req, res){
    Candidate.find({}.then(function(candidates){  //returned_candidates
      res.render("candidates-index",{
        candidates: candidates  //returned_candidates
      });
    });
  });
  //   res.render("candidates-index", {   **these lines were replaced by 26-28
  //     candidates: db.candidates
  //     });
  //   });
  // });

app.get("/candidates/:name", function(req, res){
  Candidate.findOne({name: req.params.name}).then(function(){
    res.render("candidates-show", {
      candidate: candidate
    });
  });
});

  // var desiredName = req.params.name;   **these lines replaces by 39-41
  // var candidateOutput;
  // db.candidates.forEach(function(candidate){
  //   if(desiredName === candidate.name){
  //     candidateOutput = candidate;
  //   }
  // });
  // res.render("candidates-show", {
  //   candidate: candidateOutput
  // });
// });

app.post("/candidates", function(req, res){
  // res.json(req.body);
  var candidateData = req.body.candidate;
  Candidate.create(candidateData).then(function(newCandidate){
    res.redirect("/candidates/" + candidate.name);
  });
});

app.post("/candidates/:name", function(req, res){
  var desiredName = req.params.name
  var candidateData = req.body.candidate;
  Candidate.findOneAndUpdate(name: desiredName), candidateData, {new: true}).then(function(updatedCandidate){
    res.redirect("/candidates/" + updatedCandidate.name);
  });
});

app.post("/candidates/:name/delete", function(req, res){
  var desiredName = req.params.name
  Candidate.findOneAndRemove(name: desiredName).then(function(){
    res.redirect("/candidates/");
  });
});

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
