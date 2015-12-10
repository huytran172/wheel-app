module.export = function(app){
	var index = require('../controllers/indexController');
	app.get('/', index.renderer);
}