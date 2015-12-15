var config = require('./config'),
express = require('express'),
bodyParser = require('body-parser'),
path = require('path'),
passport = require('passport');

module.exports = function(){
	var app = express();

	app.use(express.static(path.join(__dirname, '../public')));

	app.use("/styles",  express.static(__dirname + '/public/stylesheets'));
	app.use("/scripts", express.static(__dirname + '/public/javascripts'));
	app.use("/images",  express.static(__dirname + '/public/images'));

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());

	//Not quite sure what this does apart from setting views.
	app.set('views', '../public/views');

	app.use(passport.initialize());
	app.use(passport.session());

	require('../routes/indexRoute.js')(app);
	require('../routes/userRoute.js')(app);

	app.use(express.static('../public'));

	return app;

}