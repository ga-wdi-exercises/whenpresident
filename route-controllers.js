function rootCtrl(req, res) {
  res.render("app-welcome");
}

function candidateIndexCtrl(req, res, Candidate) {
  Candidate.find({}).then(function(candidates) {
    res.render("candidates-index", {
      candidates: candidates
    });
  });
}

function candidateNewCtrl(req, res, Candidate) {
  Candidate.create(req.body.candidate).then(function() {
    res.redirect("/candidates");
  });
}

function candidateShowCtrl(req, res, Candidate) {
  var desiredName = req.params.name;
  var candidateOutput;
  Candidate.find({}).then(function(candidates) {
    candidates.forEach(function(candidate){
      if(req.params.name === candidate.name){
        candidateOutput = candidate;
      }
    });
    res.render("candidates-show", {
      candidate: candidateOutput
    });
  });
}

function candidateDeleteCtrl(req, res, Candidate) {
  Candidate.findOneAndRemove({name: req.params.name}).then(function() {
    res.redirect("/candidates");
  });
}

function candidateEditCtrl(req, res, Candidate) {
  var name = req.params.name;
  Candidate.findOneAndUpdate({name: name}, req.body.candidate, {new: true})
  .then(function(candidate) {
    res.redirect("/candidates/" + candidate.name);
  });
}

module.exports = {
  rootCtrl:            rootCtrl,
  candidateIndexCtrl:  candidateIndexCtrl,
  candidateShowCtrl:   candidateShowCtrl,
  candidateNewCtrl:    candidateNewCtrl,
  candidateDeleteCtrl: candidateDeleteCtrl,
  candidateEditCtrl:   candidateEditCtrl
};
