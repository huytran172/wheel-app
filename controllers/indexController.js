exports.render = function(req, res){
	//Send index file
	res.sendFile('../public/index.html');
}