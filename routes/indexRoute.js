module.exports = function(app){
	var index = require('../controllers/indexController');
	app.get('*', index.render);
}