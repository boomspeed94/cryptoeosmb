const mongoose = require('mongoose');
const router = require('express').Router();
const LotteryTime = mongoose.model('LotteryTime');
const notify = require('./../notify')

router.post('/', function(req, res, next){
    if(req.body.lottery === 'undefined'){
        res.status(422).json({errors: {'lottery': "can't be blank!"}})
    }
    notify.send({winning_number: req.body.lottery})
    res.json({'lottery': req.body.lottery})
});

module.exports = router;
