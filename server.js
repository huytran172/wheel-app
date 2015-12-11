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
app.use(express.static('./public'))

app.get('*', function (req, res) {
	res.sendfile('public/index.html');
	// res.render('home', {user: req.user});
});

//app.post('/login', passport.authenticate('local', { successRedirect: '/',
//	failureRedirect: '/login' }));
//
////displays signup page
//app.get('/auth/signup', function(req, res){
//	res.render('signin');
//});
//
////sends the request through our local signup strategy, and if successful takes user to homepage, otherwise returns then to signin page
//app.post('/local-reg', passport.authenticate('local-signup', {
//	successRedirect: '/',
//	failureRedirect: '/signin'
//})
//);
//
//// auth/login
//// - POST: Example data {username: 'huytran', password: '123'}
//// - response {state: "success", {username: name, userID: id}
////         or {state: "error"  , error_message: error}
//
////sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
//app.post('/auth/login',
//	passport.authenticate('local-signin', {
//		successRedirect: '/',
//		failureRedirect: '/auth/login'
//	}),
//	function(req, res){
//
//	}
//	);
//
////logs user out of site, deleting them from the session, and returns to homepage
//app.get('/logout', function(req, res){
//	var name = req.user.username;
//	console.log("LOGGIN OUT " + req.user.username)
//	req.logout();
//	res.redirect('/');
//	req.session.notice = "You have successfully been logged out " + name + "!";
//});
//
//
////==============PORT==================
var port = process.env.PORT || 3000; //select your port or let it pull from your .env file
app.listen(port);
console.log('Server is running on port ' + port);
//
//
//
////-----------------------------------
////index.js/
//
//
////We will be creating these two files shortly
//// var config = require('./config.js'), //config file contains all tokens and other private info
////    funct = require('./functions.js'); //funct file contains our helper functions for our Passport and database work