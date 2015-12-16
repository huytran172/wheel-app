var request = require('request'),
    main = require('../server.js');

module.exports = function(app) {
  app.get('/api/question', function (req, res) {
    console.log('GOT A QUESTION FOR YA');
    console.log(main.questionOTD());
    var ques = {};
    var apiRes = main.questionOTD();
    ques.questionText = apiRes.question;
    ques.answerText = apiRes.answer;
    res.send(ques);
  });
};
