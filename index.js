// require libraries
var express = require("express");
var parser  = require("body-parser");
var hbs     = require("express-handlebars");

// require files
var mongoose = require("./db/connection");

// instance of express app
var app     = express();

// for deployment, this tells what port to run on
app.set("port", process.env.PORT || 3001);

// sets our view engine
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));
// tells where to look for static files
app.use("/assets", express.static("public"));

// configures the parser to support html forms
app.use(parser.urlencoded({extended: true}));

// candidate model
var Candidate = mongoose.model("Candidate");

// sets routes and controllers (callback functions)
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
  Candidate.findOne({name: req.params.name}).then(function(candidate){
    res.render("candidates-show", {
      candidate: candidate
    });
  });
});

app.post("/candidates", function(req, res){
  // passes in the name stored in req.body as an argument to .create
  Candidate.create(req.body.candidate).then(function(){
    res.redirect("/candidates/" + candidate.name);
  });
});

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
