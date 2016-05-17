var express = require("express");
var parser  = require("body-parser");
var hbs     = require("express-handlebars");
var session = require("express-session");
var cmongo  = require("connect-mongo");
var request = require("request");
var qstring = require("qs");
var mongoose= require("./db/connection");

var app     = express();
var MongoSession = cmongo(session);
var env     = require("./env.json");

process.env.session_secret = env.session_secret;
process.env.t_callback_url = env.t_callback_url;
process.env.t_consumer_key = env.t_consumer_key;
process.env.t_consumer_secret = env.t_consumer_secret;

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
  secret: process.env.session_secret,
  resave: false,
  saveUninitialized: false,
  store: new MongoSession({
    mongooseConnection: mongoose.connection
  })
}));

app.get("/login/twitter", function(req, res){
  var postData = {
    url:    "https://api.twitter.com/oauth/request_token",
    oauth:  {
      callback:         process.env.t_callback_url,
      consumer_key:     process.env.t_consumer_key,
      consumer_secret:  process.env.t_consumer_secret
    }
  };
  request.post(postData, function(err, rawResponse){
    var response = qstring.parse(rawResponse.body);
    var querystring = qstring.stringify({
      oauth_token: response.oauth_token
    });
    req.session.temp_token  = response.oauth_token;
    req.session.temp_secret = response.oauth_token_secret;
    res.redirect("https://api.twitter.com/oauth/authenticate?" + querystring);
  });
});

app.get("/logout", function(req, res){
  req.session.destroy();
  res.redirect("/");
});

app.get("/login/twitter/callback", function(req, res){
  var querystring = qstring.parse(req.query);
  var postData = {
    url: "https://api.twitter.com/oauth/access_token",
    oauth: {
      consumer_key:     process.env.t_consumer_key,
      consumer_secret:  process.env.t_consumer_secret,
      token:            req.session.temp_token,
      token_secret:     req.session.temp_secret,
      verifier:         querystring.oauth_verifier
    }
  };
  request.post(postData, function(err, rawResponse){
    var response = qstring.parse(rawResponse.body);
    req.session.t_user_id           = response.user_id;
    req.session.t_screen_name       = response.screen_name;
    req.session.t_oauth_data        = {
      token:            response.oauth_token,
      token_secret:     response.oauth_token_secret,
      consumer_key:     process.env.t_consumer_key,
      consumer_secret:  process.env.t_consumer_secret
    };
    res.redirect("/login/twitter/refresh_user_data");
  });
});

app.get("/login/twitter/refresh_user_data", function(req, res){
  var apiRequestParameters = {
    url:    "https://api.twitter.com/1.1/users/show.json",
    json:   true,
    oauth:  req.session.t_oauth_data,
    qs:     {
      screen_name: req.session.t_screen_name
    }
  };
  request.get(apiRequestParameters, function(err, response){
    var candidate_info  = {
      name:         response.body.name,
      screen_name:  response.body.screen_name,
      photo_url:    response.body.profile_image_url
    };
    var search_params   = {
      screen_name:  response.body.screen_name
    };
    Candidate.findOneAndUpdate(
      search_params, candidate_info, {new: true}
    ).then(function(candidate){
      if(candidate){
        res.json({success: "updated", candidate: candidate});
      }else{
        Candidate.create(candidate_info).then(function(candidate){
          res.json({success: "created", candidate: candidate});
        });
      }
    });
  });
})

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
