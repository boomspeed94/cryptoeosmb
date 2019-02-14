const mongoose = require('mongoose');
const router = require('express').Router();
const LotteryTime = mongoose.model('LotteryTime');

router.get('/', function (req, res, next) {
    LotteryTime.findOne({'name':"Lottery Time"}).then(function (lotteryTime) {
        if(!lotteryTime) res.sendStatus(401);
        res.json(lotteryTime.toJSON())
    }).catch(next);

});

router.post('/', function(req, res, next){
    if(req.body.time === 'undefined'){
        res.status(422).json({errors: {'time': "can't be blank!"}})
    }

    var lotteryTime = new LotteryTime();
    lotteryTime.name = req.body.name ? req.body.name : 'Lottery Time';
    lotteryTime.time = req.body.time;
    lotteryTime.repeat = req.body.repeat ? req.body.repeat : 1;
    lotteryTime.repeat_period = req.body.repeat_period ? req.body.repeat_period : 'day';
    lotteryTime.save().then(function () {
        return res.json(lotteryTime.toJSON())
    }).catch(next);
});

router.put('/', function(req, res, next){
    LotteryTime.findOne({name: 'Lottery Time'}).then(function(lotteryTime){
        if(!lotteryTime){ return res.status(404).json({errors: 'Count down time not exists. Let create one.'}); }

        if(typeof req.body.time !== 'undefined'){
            lotteryTime.time = req.body.time;
        }

        return lotteryTime.save().then(function(){
            return res.json(lotteryTime.toJSON());
        });
    }).catch(next);
});

module.exports = router;
