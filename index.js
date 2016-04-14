var express = require("express");
var parser = require("body-parser");
var hbs = require("express-handlebars");
var mongoose = require("./db/connection");

var app = express();

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

var Candidate = mongoose.model("Candidate");

app.get("/", function(req, res){
  res.render("app-welcome");
});

app.get("/candidates", function(req, res){
  Candidate.find().then(function(c){
    res.render("candidates-index", {
      candidates: c
    });
  });
});

app.post("/candidates", function(req, res){
  //res.json(req.body); NOTE: See the body of the request as json
  Candidate.create(req.body.candidate).then(function(){
    res.redirect("/candidates");
  });
});

app.get("/candidates/:name", function(req, res){
  Candidate.findOne({name: req.params.name}).then(function(c){
    res.render("candidates-show",{
      candidate: c
    });
  });
});

app.post("/candidates/:name/delete", function(req, res){
  Candidate.remove({name: req.params.name}).then(function(){
    res.redirect("/candidates");
  });
});

app.post("/candidates/:name/update", function(req, res){
  Candidate.findOneAndUpdate({name: req.params.name}, req.body.candidate).then(function(){
    res.redirect("/candidates");
  });
});

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
