const router = require('express-promise-router')()
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { auth } = require('../controller')

router.route('/login').post(auth.login)
router.route('/register').post(auth.register)

module.exports = router
