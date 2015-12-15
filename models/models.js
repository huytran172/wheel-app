var mongoose = require('mongoose');
var questionSchema = new mongoose.Schema({
  answerAt: {type: Date, default: Date.now},
  answerBy: String,
  text: String
});
var userSchema = new mongoose.Schema({
  username: String,
  password: String, //hash created from password
  created_at: {type: Date, default: Date.now},
  points: Number
});
mongoose.model('User', userSchema);
mongoose.model('Question', questionSchema);
