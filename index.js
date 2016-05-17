var express = require("express");
var parser  = require("body-parser");
var hbs     = require("express-handlebars");
var session = require("express-session");
var cmongo  = require("connect-mongo");
var mongoose= require("./db/connection");

var app     = express();
var MongoSession = cmongo(session);

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
app.use(parser.json({extended: true}));
app.use(session({
  secret: "some random string",
  resave: false,
  saveUninitialized: false,
  store: new MongoSession({
    mongooseConnection: mongoose.connection
  })
}));

app.get("/api/candidates", function(req, res){
  Candidate.find({}).then(function(candidates){
    res.json(candidates);
  });
});

app.get("/api/candidates/:name", function(req, res){
  Candidate.findOne(req.params).then(function(candidate){
    res.json(candidate);
  });
});

app.post("/api/candidates", function(req, res){
  Candidate.create(req.body).then(function(candidate){
    res.json(candidate);
  });
});

app.delete("/api/candidates/:name", function(req, res){
  Candidate.findOneAndRemove(req.params).then(function(){
    res.json({success: true});
  });
});

app.put("/api/candidates/:name", function(req, res){
  Candidate.findOneAndUpdate(req.params, req.body, {new: true}).then(function(candidate){
    res.json(candidate);
  });
});

app.get("/*", function(req, res){
  res.render("layout-main", {layout: false});
});

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
