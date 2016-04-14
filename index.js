var express = require("express");
var parser = require("body-parser");
var hbs = require("express-handlebars");
var session = require("express-session");
var request = require("request");
var qstring = require("qs");
var cmongo = require("connect-mongo");
var twitter = require("./lib/twitter_auth");
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

if(process.env.NODE_ENV !== "production"){
  var env   = require("./env");
  process.env.session_secret = env.session_secret;
  process.env.t_callback_url = env.t_callback_url;
  process.env.t_consumer_key = env.t_consumer_key;
  process.env.t_consumer_secret = env.t_consumer_secret;
}


app.use(session({
  secret: process.env.session_secret,
  resave: false,
  saveUninitialized: false,
  store: new (require("connect-mongo")(session))({
    mongooseConnection: mongoose.connection
  })
}));


app.use("/assets", express.static("public"));
app.use(parser.urlencoded({extended: true}));
app.use(function(req, res, next){
  twitter.checkIfSignedIn(req, res, function(){
    next();
  });
});

app.get("/", function(req, res){
  res.render("candidates");
});

app.get("/login/twitter", function(req, res){
  twitter.getSigninURL(req, res, function(url){
    res.redirect(url);
  });
});

app.get("/login/twitter/callback", function(req, res){
  twitter.whenSignedIn(req, res, function(){
    res.redirect("/");
  });
});
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
  Candidate.create(req.body.candidate).then(function(candidate){
    res.redirect("/candidates/" + candidate.name);
  });
});

app.post("/candidates/:name/delete", function(req, res){
  Candidate.findOneAndRemove({name: req.params.name}).then(function(){
    res.redirect("/candidates");
  });
});

app.post("/candidates/:name", function(req, res){
  Candidate.findOneAndUpdate( {name: req.params.name},req.body.candidate).then(function(){
    res.redirect("/candidates/" + candidate.name);
  });
});


app.post("/candidates/:name/positions", function(req, res){
  Candidate.findOne({name: req.params.name}).then(function(candidate){
    candidate.positions.push(req.body.position);
    candidate.save().then(function(){
      res.redirect("/candidates/" + candidate.name);
    });
  });
});

app.post("/candidates/:name/positions/index", function(req, res){
  Candidate.findOne( {name: req.params.name}).then(function(candidate){
    candidate.positions.splice(req.params.index, 1);
    candidate.save().then(function(){
      res.redirect("/candidates/" + candidate.name);
    });
  });
});

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
