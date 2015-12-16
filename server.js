var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var request = require('request');
//initialize mongoose schemas
require('./models/models');
var questions = require('./routes/questions');
var authenticate = require('./routes/authenticate')(passport);
var leaderboard = require('./routes/leaderboard');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Stopwatch = require('./models/stopwatch');
var app = express();
app.use(logger('dev'));
app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}));
var q;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

//// Initialize Passport
var initPassport = require('./passport-init');
initPassport(passport);
app.use('/auth', authenticate);
app.use('/leaderboard', leaderboard);
app.use('/questions', questions);
app.get('/questions/:id', function (req, res) {
  res.json([
    {question: "1+1", answer: "2", answeredBy: req.params.id}
  ]);
});

require('./routes/api')(app);

//Get question of the day/hour/minute
//Returns the question string. 
//Super spaghetti code.
function getNewQuestionFromAPI(){
  request('http://www.jservice.io/api/random', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      q = JSON.parse(body)[0];
      console.log("found a question: " + q);
    }
    else q = null;
  });
  return q;
};

//TIMER TIMER TIMER TIMER STUFF
//---------STOPWATCH-------------
var stopwatch = new Stopwatch();  

stopwatch.on('start:stopwatch', function() {
  getNewQuestionFromAPI();
  module.exports.questionOTD = function(){
    return q;
  }
});

stopwatch.on('tick:stopwatch', function(time) {  
  io.sockets.emit('time', { time: time });
  // console.log(q);
});

stopwatch.on('reset:stopwatch', function(time) {
  //Get new question, set new question 
  getNewQuestionFromAPI(); 
  io.sockets.emit('load'); //Maybe replace this with broadcast.
  io.sockets.emit('time', { time: time });
});

stopwatch.start();
//-----------SOCKET---------------


app.get('*', function (req, res) {
	res.sendfile('public/index.html');
});
////==============PORT==================
var port = process.env.PORT || 3000; //select your port or let it pull from your .env file
var server = app.listen(port);
var io = require('socket.io').listen(server);
console.log('Server is running on port ' + port);
