const router = require('express').Router();
const controller = require('./controller');

// front end routes page linking to my router.js

router.get('/', controller.index);

router.get('/saved/:id', controller.show);
router.get('/edit/:id', controller.edit);

module.exports = router;
