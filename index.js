
var express = require("express");              // Pulling library via the npm install//
var hbs     = require("express-handlebars");  // Pulling library via the npm install//
// var db      = require("./db/connection");   //local file.  Use ./ only for require.//
var mongoose = require("./db/connection");
var parser = require("body-parser");

var app     = express();

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({                //From Express handlebars.  Tells render what to do.//
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));
app.use("/assets", express.static("public")); //any static asset will be in public folder (/assets)
app.use(parser.urlencoded({extended: true})); //Configure parser to support html forms.//

var Candidate = mongoose.model("Candidate");  //Pulled from model repository.//

app.get("/", function(req, res){
  res.render("app-welcome");
});

app.get("/candidates", function(req, res){
  Candidate.find({}).then(function(candidates) {  //Find all candidates first.  Find returns array; findOne returns the first match.//
    res.render("candidates-index", {
      candidates: candidates  //This object is passed into .render method so it appears in view at /candidates. (renders candidates to index page.)//
  });
});
});// Params- pull info from forms, url//

app.get("/candidates/:name", function(req, res){
  // var desiredName = req.params.name;     //.name is available in params because name object is specified in .get("/candidates/:name")//
  // var candidateOutput;
  // db.candidates.forEach(function(candidate){    //Equivalent to @candidate.findparams[:id]//
  //   if(desiredName === candidate.name){
  //     candidateOutput = candidate;
  //   }
  // });
  Candidate.findOne({name: req.params.name}).then(function(candidate) {
    res.render("candidates-show", {
      candidate: candidate    //This is akin to @candidate in rails.  This instance of candidate re[resents the candidate name in the url.//]
    });
  });
});

app.post("/candidates",  function(req, res) {
  // res.json(req.body);                           //What exactly does this line do?//
  Candidate.create(req.body.candidate).then(function(candidate) {
    res.redirect("/candidates/" + candidate.name);
  });
});

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
