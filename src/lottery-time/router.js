const mongoose = require('mongoose');
const router = require('express').Router();
const LotteryTime = mongoose.model('LotteryTime');

router.get('/', function (req, res, next) {
    LotteryTime.findOne({'name':"Lottery Time"}).then(function (time) {
        if(!time) res.sendStatus(401);
        res.json({'lottery_time': time.time})
    }).catch(next);

});

router.post('/', function(req, res, next){
    if(req.body.time === 'undefined'){
        res.status(422).json({errors: {'time': "can't be blank!"}})
    }

    var lotteryTime = new LotteryTime();
    lotteryTime.name = req.body.name ? req.body.name : 'Lottery Time';
    lotteryTime.time = req.body.time;
    lotteryTime.save().then(function () {
        return res.json({'lottery_time': lotteryTime.time})
    }).catch(next);
});

router.put('/', function(req, res, next){
    LotteryTime.findOne({name: 'Lottery Time'}).then(function(lotteryTime){
        if(!lotteryTime){ return res.status(404).json({errors: 'Count down time not exists. Let create one.'}); }

        if(typeof req.body.time !== 'undefined'){
            lotteryTime.time = req.body.time;
        }

        return lotteryTime.save().then(function(){
            return res.json({'lottery_time': lotteryTime.time});
        });
    }).catch(next);
});

module.exports = router;
