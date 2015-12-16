var express = require('express'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    router = express.Router();

router
  .route('/users')
  // get all users for leaderboard
  .get(function (req, res) {
    User.find(function (err, users) {
      if(err){
        return res.send(500, err);
      }
      return res.send(200, users);
    })
  });

module.exports = router;
