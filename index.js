var express = require("express");
var parser = require("body-parser"); // this is middleware used to support html forms
var hbs     = require("express-handlebars");
var mongoose      = require("./db/connection"); //changed db to mongoose

var app     = express();

var Candidate = mongoose.model("Candidate"); // got candidate from mongoose.model

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));
app.use("/assets", express.static("public"));
app.use(parser.urlencoded({extended: true})); // this enables us to read input from the html form

app.get("/", function(req, res){
  res.render("app-welcome");
});

app.get("/candidates", function(req, res){
  Candidate.find({}).then(function(candidates){

  res.render("candidates-index", {
    candidates: candidates //candidates: is reference in view, and second candidates is the one passed into function above
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

/* create candidate */
app.post("/candidates", function(req, res){
  //res.json(req.body); this shows you the json after you create it
  Candidate.create(req.body.candidate).then(function(candidate){
  res.redirect("/candidates/" + candidate.name);
  //doing req.body.candidate zooms into the candidate name and date in json file
  // then is a callback that happens after something else finishes.
})
});

/* Edit candidate */
app.post("/candidates/:name", function(req, res){ // browsers don't support edit and delete so you need to use a hackey method.
  Candidate.findOneAndUpdate({name: req.params.name}, req.body.candidate, {new:true}).then(function(candidate){ // if no new:true then old candidate is still shown when you refresh page.
      res.redirect("/candidates/" + candidate.name);
  });
});

/* delete candidate */
app.post("/candidates/:name/delete", function(req, res){
  Candidate.findOneAndRemove({name: req.params.name}).then(function(){
    res.redirect("/candidates")
  });
});

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
