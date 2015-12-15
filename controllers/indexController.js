var path = require('path');

exports.render = function(req, res){
	//Send index file
	res.sendFile(path.join(__dirname, '../public', 'index.html'));
}