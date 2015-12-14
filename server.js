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
//var api = require('./routes/api');
var authenticate = require('./routes/authenticate')(passport);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var app = express();
app.use(logger('dev'));
app.use(session({
  secret: 'super secret'
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
app.get('/questions/:id', function (req, res) {
  res.json([
    {question: "1+1", answer: "2", answeredBy: req.params.id}
  ]);
});

app.get('*', function (req, res) {
	res.sendfile('public/index.html');
});
////==============PORT==================
var port = process.env.PORT || 3000; //select your port or let it pull from your .env file
app.listen(port);
console.log('Server is running on port ' + port);
