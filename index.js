var express = require("express");              // Pulling library via the npm install//
var hbs     = require("express-handlebars");  // Pulling library via the npm install//
var db      = require("./db/connection");   //local file//

var app     = express();

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({                //From Express handlebars//
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));
app.use("/assets", express.static("public")); //any static asset will be in public folder (/assets)

var Candidate = mongoose.model("Candidate");  //Pulled from model repository.//

app.get("/", function(req, res){
  res.render("app-welcome");
});

app.get("/candidates", function(req, res){
  Candidate.find({}).then(function() {
    res.render("candidates-index", {
      candidates: db.candidates  //This object is passed into .render method so it appears in view at /candidates.//
  });
});
});

app.get("/candidates/:name", function(req, res){
  var desiredName = req.params.name;     //.name is available in params because name object is specified in .get("/candidates/:name")//
  var candidateOutput;
  db.candidates.forEach(function(candidate){    //Equivalent to @candidate.findparams[:id]//
    if(desiredName === candidate.name){
      candidateOutput = candidate;
    }
  });
  res.render("candidates-show", {
    candidate: candidateOutput
  });
});

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
