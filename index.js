var express = require("express");
var parser  = require("body-parser");
var hbs     = require("express-handlebars");
var session = require("express-session");
var request = require("request");
var qstring = require("qs");
var mongoose= require("./db/connection");
var twitter = require("./lib/twitter_auth");

var app     = express();

var Candidate = mongoose.model("Candidate");

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

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));
app.use("/assets", express.static("public"));
// if we wanted to reference and images folder into assets we could write a line like the one below and it would be accessible the same way as the line above
// app.use("/assets", express.static("images"));
app.use(parser.json({extended: true}));
app.use(parser.urlencoded({extended: true}));
app.use(function(req, res, next){
  twitter.checkIfSignedIn(req, res, function(){
    next();
  });
});

app.get("/login/twitter", function(req, res){
  twitter.getSigninURL(req, res, function(url){
    res.redirect(url);
  });
});

app.get("/login/twitter/callback", function(req, res){
  twitter.whenSignedIn(req, res, function(){
    req.session.destroy();
    res.redirect("/");
  });
});

//important to add /api to make it a true HTML5 app, avoid collision of angular and express listening for the sam url
app.get("/api/candidates", function(req, res){
  Candidate.find({}).lean().exec().then(function(candidates){
    candidates.forEach(function(candidate){
      candidate.isCurrentUser = (candidate._id == req.session.candidate_id);
    });
    res.json(candidates);
  });
});

// app.get("/candidates/:name", function(req, res){
app.get("/api/candidates/:name", function(req, res){
  Candidate.findOne({name: req.params.name}).then(function(candidate){
    res.json(candidate)
    // res.render("candidates-show", {
    //   candidate: candidate,
    //   isCurrentUser: (candidate._id == req.session.candidate_id)
    // });
  });
});

// app.post("/candidates/:name/delete", function(req, res){
app.delete("/api/candidates/:name", function(req, res){
  Candidate.findOneAndRemove({name: req.params.name}).then(function(){
    //help for developer to know that a candidate was deleted
    res.json({success: true})
    // res.redirect("/candidates")
  });
});

// app.post("candidates/:name", function(req, res){
app.put("/api/candidates/:name", function(req, res){
  Candidate.findOneAndUpdate({name: req.params.name}, req.body.candidate, {new: true}).then(function(candidate){
    res.json(candidate)
    // res.redirect("/candidates/" + candidate.name);
  });
});

app.get("/*", function(req, res){
  res.render("candidates");
});

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
