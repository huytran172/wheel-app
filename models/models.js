var mongoose = require('mongoose');
var questionSchema = new mongoose.Schema({
  createdAt: {type: Date, default: Date.now},
  answerAt: String,
  createdBy: String,
  answerBy: String,
  questionText: String,
  answerText: String
});
var userSchema = new mongoose.Schema({
  username: String,
  password: String, //hash created from password
  created_at: {type: Date, default: Date.now},
  points: Number
});
mongoose.model('User', userSchema);
mongoose.model('Question', questionSchema);
