var mongoose  = require("mongoose");

var CandidateSchema = new mongoose.Schema(
  {
    name: String,
    year: Number,
    positions: [String],
    t_id: String,
    t_username: String,
    t_photo_url: String
  }
);

mongoose.model("Candidate", CandidateSchema);
if(process.env.NODE_ENV == "production"){
  mongoose.connect(process.env.MONGOLAB_URL);
}else{
  mongoose.connect("mongodb://localhost/whenpresident");
}

module.exports = mongoose;
