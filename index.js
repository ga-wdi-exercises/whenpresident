var express   = require("express");
var parser    = require("body-parser");
var hbs       = require("express-handlebars");
var Candidate = require("./db/connection").CandidateModel;
var ctrl 	    = require("./route-controllers");
var app       = express();

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

app.get("/candidates", function(req, res) {
	ctrl.candidateIndexCtrl(req, res, Candidate);
});

app.post("/candidates", function(req, res) {
	ctrl.candidateNewCtrl(req, res, Candidate);
});

app.get("/candidates/:name", function(req, res) {
	ctrl.candidateShowCtrl(req, res, Candidate);
});

app.post("/candidates/:name/delete", function(req, res) {
	ctrl.candidateDeleteCtrl(req, res, Candidate);
});

app.post("/candidates/:name/", function(req, res) {
	ctrl.candidateEditCtrl(req, res, Candidate);
});

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
