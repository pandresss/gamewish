// here is where my routes are seting up talking to the controllers




const router = require('express').Router();

const AuthService = require('./services/auth');
const passport = require('passport');

router.use('/games', AuthService.restrict, require('./controller/games'));
router.use('/api', require('./controller/api'));
router.get('/', (req, res) => res.render('index'));

module.exports = router;
