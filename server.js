var express = require('express'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	MongooseStrategy = require('passport-local-mongoose'),
	// TwitterStrategy = require('passport-twitter'),
	// GoogleStrategy = require('passport-google'),
	// FacebookStrategy = require('passport-facebook'),
app = express();


//===============PASSPORT===============

//Passport stuff here

//===============EXPRESS================
// Configure Express
app.use(logger('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

// Session-persisted message middleware
app.use(function(req, res, next){
	var err = req.session.error,
	msg = req.session.notice,
	success = req.session.success;

	delete req.session.error;
	delete req.session.success;
	delete req.session.notice;

	if (err) res.locals.error = err;
	if (msg) res.locals.notice = msg;
	if (success) res.locals.success = success;

	next();
});

//============ROUTES===============
app.use(bodyParser());
app.use(express.static('./public'));
app.get('/questions/:id', function (req, res) {
  res.json({question: "1+1", answer: "2", answeredBy: req.params.id});
});
app.post('/auth/login', function (req, res) {
  res.json({state: 'success', username: 'huytran', point: 10});
});
app.get('*', function (req, res) {
	res.sendfile('public/index.html');
	// res.render('home', {user: req.user});
});
////==============PORT==================
var port = process.env.PORT || 3000; //select your port or let it pull from your .env file
app.listen(port);
console.log('Server is running on port ' + port);
