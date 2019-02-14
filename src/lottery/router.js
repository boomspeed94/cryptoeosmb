const mongoose = require('mongoose');
const router = require('express').Router();
const LotteryTime = mongoose.model('LotteryTime');
const notify = require('./../notify')
const Lottery = mongoose.model('Lottery');

router.get('/', function(req, res, next){
  var nowDate = new Date();
  var gmtDate = new Date(Date.UTC(nowDate.getFullYear(),nowDate.getMonth(), nowDate.getDate()));
  console.log(nowDate);
  console.log(gmtDate);
  Lottery.findOne({date_created: {$gt: gmtDate}}).then(function(lottery){
    if(!lottery){
      res.status(404).json({error: 'Today still not lottery!!!'})
    }
    notify.send({'lottery': lottery.toJSON()})
    res.json({'lottery': lottery.toJSON()})
  }).catch(next);
});

router.post('/', function(req, res, next){
    if(req.body.lottery === 'undefined'){
        res.status(422).json({errors: {'lottery': "can't be blank!"}})
    }

    var lottery = new Lottery();
    lottery.white_ball_1 = req.body.lottery.white_ball_1;
    lottery.white_ball_2 = req.body.lottery.white_ball_2;
    lottery.white_ball_3 = req.body.lottery.white_ball_3;
    lottery.white_ball_4 = req.body.lottery.white_ball_4;
    lottery.white_ball_5 = req.body.lottery.white_ball_5;
    lottery.red_ball = req.body.lottery.red_ball;
    lottery.date_created = new Date();
    lottery.save().then(function(){
      notify.send({'lottery': lottery.toJSON()})
      res.json({'lottery': lottery.toJSON()})
    }).catch(next);
});

module.exports = router;
