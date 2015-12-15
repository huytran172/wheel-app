var users = require('../controllers/userController'),
	passport = require('passport');

module.exports = function(app) {
	// app.route('/users').post(users.create).get(users.list);

	// app.route('/users/:userId').get(users.read).put(users.update).delete(users.delete);

	// app.param('userId', users.userByID);

	app.route('/auth/signup')
		.get(users.renderRegister)
		.post(users.register);
		// .post(users.debug);


	app.route('/auth/login')
		.get(users.renderLogin)
		// .post(function(res, req){

		// })
		.post(passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/login',
			failureFlash: true
		}));

	app.get('/logout', users.logout);
};