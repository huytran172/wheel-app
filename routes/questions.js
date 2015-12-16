var express = require('express'),
    mongoose = require('mongoose'),
    Question = mongoose.model('Question'),
    User = mongoose.model('User'),
    router = express.Router();

router
  .route('/question')
  // .get(function (req, res) {
  //   // find the question that is not answered
  //   Question.findOne({answerBy: ''}, function (err, data) {
  //    if (err) {
  //      res.send(err);
  //    }
  //    res.json(data)
  //   })
  // });

  .post(function (req, res) {
    var question = new Question();
    question.answerBy   = req.body.username;
    question.questionText = req.body.questionText;
    question.answerText   = req.body.answerText;
    question.answerAt = Date.now();

    question.save(function(err, question){
      if(err)
        res.send(err);

      res.json(question);
    });
});
  // .put(function (req, res) {
  //   Question.update(
  //     {_id: req.body._id},
  //     {
  //       answerBy: req.body.username,
  //       answerAt: Date.now()
  //     },
  //     {
  //       multi: true
  //     },
  //     function (err, question) {
  //       User.findOne({username: req.body.username}, function (err, user) {
  //         user.points += 10;
  //         user.save();
  //       });
  //
  //       if (err) {
  //         res.send(err);
  //       }
  //       res.json(question);
  //     }
  //   )
  // });
  // get all question with that id
router.route('/question/:id')
  .get(function (req, res) {
    User.findOne({_id: req.params.id}, function (err, currentUser) {
      if (err) {
        res.send(err);
      }
      Question.find({answerBy: currentUser.username}, function (err, data) {
        res.json(data);
      })
    })
  });
router.route('/feed')
  .get(function (req, res) {
    Question.find({answerBy: {$ne: ""}}, function (err, data) {
      if (err) {
        res.send(err);
      }
      res.json(data);
    })
  });
  router.route('/userRecord')
    .post(function (req, res) {
      User.findOne({_id: req.body._id}, function (err, data) {
        if (err) {
          res.send(err);
        }
        res.json(data);
      })
    });

module.exports = router;
