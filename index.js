var express  = require("express");
var morgan   = require('morgan');
var parser   = require("body-parser");
var hbs      = require("express-handlebars");
var mongoose = require("./db/connection");

var app = express();

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
app.use(parser.json());
app.use(morgan('tiny'));

app.get("/api/candidates", function(req, res){
  Candidate.find({}).then(function(candidates){
    res.json(candidates)
  });
});

app.get("/api/candidates/:name", function(req, res){
  Candidate.findOne({name: req.params.name}).then(function(candidate){
    res.json(candidate)
  });
});

app.post("/api/candidates", function(req, res){
  Candidate.create(req.body).then(function(candidate){
    res.json(candidate)
  })
});

app.delete("/api/candidates/:name", function(req, res){
  Candidate.findOneAndRemove({name: req.params.name}).then(function(){
    res.json({ success: true })
  });
});

app.put("/api/candidates/:name", function(req, res){
  Candidate.findOneAndUpdate({name: req.params.name}, req.body, {new: true}).then(function(candidate){
    res.json(candidate)
  });
});

app.get("/*", function(req, res){
  res.render("candidates");
});

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
