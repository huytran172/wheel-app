var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
//initialize mongoose schemas
require('./models/models');
var questions = require('./routes/questions');
var authenticate = require('./routes/authenticate')(passport);
var leaderboard = require('./routes/leaderboard');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var app = express();
app.use(logger('dev'));
app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}));
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

app.get('*', function (req, res) {
	res.sendfile('public/index.html');
});
////==============PORT==================
var port = process.env.PORT || 3000; //select your port or let it pull from your .env file
app.listen(port);
console.log('Server is running on port ' + port);
