var express = require('express'),
	request = require('request'),
	router = express.Router();

// router.route('/api/question')
//   .get(function (req, res) {
//     console.log('GOT A QUESTION FOR YA');
//     getNewQuestionFromAPI();
//     res.json({"questionText":"AAAA"})
//     // res.json(ques);
//   })

router.get('/api/question', function (req, res, next) {
    console.log('GOT A QUESTION FOR YA');
    getNewQuestionFromAPI();
    res.send({questionText:"AAAA"});
    // res.json(ques);
    next();
  });

function getNewQuestionFromAPI(){
  request('http://www.jservice.io/api/random', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Print the google web page.
  }
  });
};

module.exports = router;
