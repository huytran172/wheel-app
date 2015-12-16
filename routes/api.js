var request = require('request'),
    main = require('../server.js'),
    mongoose = require('mongoose'),
    Question = mongoose.model('Question');

module.exports = function(app) {
  app.get('/api/question', function (req, res) {
    console.log('GOT A QUESTION FOR YA');
    console.log(main.questionOTD());
    var apiRes = main.questionOTD();
    res.send(apiRes);
  });
};
