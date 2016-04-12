var express   = require("express");
var parser    = require("body-parser");
var hbs       = require("express-handlebars");
var Candidate = require("./db/connection").CandidateModel;
var ctrl      = require("./route-controllers");
var app       = express();

var candidatesPath = "/candidates";

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/partials",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));
app.use("/assets", express.static("public"));
app.use(parser.urlencoded({extended: true}));

app.get("/", ctrl.rootCtrl);

app.get(candidatesPath, function(req, res) {
  ctrl.candidateIndexCtrl(req, res, Candidate);
});

app.post(candidatesPath, function(req, res) {
  ctrl.candidateNewCtrl(req, res, Candidate);
});

app.get(candidatesPath + "/:name", function(req, res) {
  ctrl.candidateShowCtrl(req, res, Candidate);
});

app.post(candidatesPath + "/:name/delete", function(req, res) {
  ctrl.candidateDeleteCtrl(req, res, Candidate);
});

app.post(candidatesPath + "/:name/", function(req, res) {
  ctrl.candidateEditCtrl(req, res, Candidate);
});

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
