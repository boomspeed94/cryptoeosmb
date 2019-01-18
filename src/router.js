const router = require('express').Router();
const users = require('./users/router');
const accounts = require('./accounts/router')

router.use('/users', users);
router.use('/accounts', accounts)

module.exports = router
