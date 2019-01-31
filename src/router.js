const router = require('express').Router();
const users = require('./users/router');
const accounts = require('./accounts/router');
const lotteryTimes = require('./lottery-time/router');
const blocks = require('./block/router')

router.use('/users', users);
router.use('/accounts', accounts)
router.use('/lottery_times', lotteryTimes);
router.use('/blocks', blocks);

module.exports = router;
