
// backend controller sending routes to the router.js


const router = require('express').Router();

const controller = require('./controller');

router.get('/', controller.index);
router.get('/games/:id', controller.show);
router.post('/games', controller.create);
router.put('/games/:id', controller.update);
router.delete('/games/:id', controller.destroy);

module.exports = router;
