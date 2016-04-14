var request = require("request");
var qstring = require("qs");
var mongoose= require("../db/connection");

var Candidate = mongoose.model("Candidate");

var twitter = {};

twitter.getSigninURL = function(req, res, callback){
  var url = "https://api.twitter.com/oauth/request_token";
  var oauth = {
    callback:         process.env.t_callback_url,
    consumer_key:     process.env.t_consumer_key,
    consumer_secret:  process.env.t_consumer_secret
  }
  request.post({url: url, oauth: oauth}, function(e, response){
    var auth_data = qstring.parse(response.body);
    var post_data = qstring.stringify({oauth_token: auth_data.oauth_token});
    req.session.t_oauth_token         = auth_data.oauth_token;
    req.session.t_oauth_token_secret  = auth_data.oauth_token_secret;
    callback("https://api.twitter.com/oauth/authenticate?" + post_data);
  });
}

twitter.whenSignedIn = function(req, res, callback){
  var url = "https://api.twitter.com/oauth/access_token";
  var auth_data = qstring.parse(req.query);
  var oauth = {
    consumer_key:     process.env.t_consumer_key,
    consumer_secret:  process.env.t_consumer_secret,
    token:            req.session.t_oauth_token,
    token_secret:     req.session.t_oauth_token_secret,
    verifier:         auth_data.oauth_verifier
  }
  request.post({url: url, oauth: oauth}, function(e, response){
    var auth_data = qstring.parse(response.body);
    req.session.t_user_id             = auth_data.user_id;
    req.session.t_screen_name         = auth_data.screen_name;
    req.session.t_oauth               = {
      consumer_key:     process.env.t_consumer_key,
      consumer_secret:  process.env.t_consumer_secret,
      token:            auth_data.oauth_token,
      token_secret:     auth_data.oauth_token_secret
    }
    request.get({
      url:    "https://api.twitter.com/1.1/users/show.json",
      json:   true,
      oauth:  req.session.t_oauth,
      qs:     {
        screen_name: req.session.t_screen_name
      }
    }, function(e, response){
      var candidate_info = {
        name:         response.body.name,
        t_id:         response.body.id,
        t_username:   response.body.screen_name,
        t_photo_url:  response.body.profile_image_url
      }
      Candidate.findOneAndUpdate({t_id: response.body.id}, candidate_info, {new: true}).then(function(candidate){
        if(candidate){
          sendCandidate(candidate);
        }else{
          Candidate.create(candidate_info).then(sendCandidate);
        }
      });
      function sendCandidate(candidate){
        req.session.candidate_id = candidate._id;
        res.redirect("/");
      }
    });
  });
}

twitter.checkIfSignedIn = function(req, res, callback){
  Candidate.findById(req.session.candidate_id).then(function(candidate){
    if(candidate) res.locals.user = candidate;
    callback();
  });
}

module.exports = twitter;
