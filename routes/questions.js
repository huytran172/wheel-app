var express = require('express'),
    mongoose = require('mongoose'),
    Question = mongoose.model('Question'),
    router = express.Router();

router
  .route('/question')
  .get(function (req, res) {
    // find the question that is not answered
    Question.findOne({answerBy: ''}, function (err, data) {
     if (err) {
       res.send(err);
     }
     res.json(data)
    })
  })
  .post(function (req, res) {
    var question = new Question();
    question.answerBy   = '';
    question.answerAt   = '';
    question.createdBy  = req.body.createdBy ? req.body.createdBy : 'admin';
    question.answerBy   = '';
    question.questionText = req.body.questionText;
    question.answerText   = req.body.answerText;

    question.save(function(err, question){
      if(err)
        res.send(err);

      res.json(question);
    });
  })
  .put(function (req, res) {
    Question.update(
      {_id: req.body._id},
      {
        answerBy: req.body.username,
        answerAt: Date.now()
      },
      {
        multi: true
      },
      function (err, question) {
        if (err) {
          res.send(err);
        }
        res.json(question);
      }
    )
  });

module.exports = router;
