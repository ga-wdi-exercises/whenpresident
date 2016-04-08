var mongoose  = require("mongoose");

var ObjectId = mongoose.Schema.Types.ObjectId;
var CandidateSchema = new mongoose.Schema(
  {
    name: String,
    year: Number,
    positions: [String],
    endorsedBy: [ObjectId],
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
