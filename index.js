var express   = require("express");
var parser    = require("body-parser");
var hbs       = require("express-handlebars");
var Candidate = require("./db/connection").CandidateModel;
var ctrl      = require("./candidates-controller");
var app       = express();

var candidatesPath = "/candidates";
var candidateCtrl  = ctrl.CandidateCtrl(Candidate);

// Fallback to port 3001 if environment not set
app.set("port", process.env.PORT || 3001);

// Configure handlebars
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/partials",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));

// Add alias for public folder
app.use("/assets", express.static("public"));
app.use(parser.urlencoded({extended: true}));

// Root route greeted with welcome
app.get("/", function(req, res) {
  res.render("app-welcome");
});

// Route to controllers
app.get(candidatesPath, candidateCtrl.index);
app.post(candidatesPath, candidateCtrl.create);
app.get(candidatesPath + "/:name", candidateCtrl.show);
app.post(candidatesPath + "/:name/delete", candidateCtrl.destroy);
app.post(candidatesPath + "/:name/", candidateCtrl.edit);

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
