function CandidateCtrl(Candidate) {
  return {
    index: function(req, res) {
      // Find and render all
      Candidate.find({}).then(function(candidates) {
        res.render("candidates-index", {
          candidates: candidates
        });
      });
    },
    create: function(req, res) {
      // Add new and return to index
      Candidate.create(req.body.candidate).then(function() {
        res.redirect("/candidates");
      });
    },
    show: function(req, res) {
      // Render show based on params
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
    },
    destroy: function(req, res) {
      // Remove and return to index
      Candidate.findOneAndRemove({
        name: req.params.name}
      ).then(function() {
        res.redirect("/candidates");
      });
    },
    edit: function(req, res) {
      // Modify existing and render new show
      var name = req.params.name;
      Candidate.findOneAndUpdate({name: name}, req.body.candidate, {new: true})
      .then(function(candidate) {
        res.redirect("/candidates/" + candidate.name);
      });
    }
  };
}

module.exports = {
  CandidateCtrl: CandidateCtrl
};
