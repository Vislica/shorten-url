const Router = require('express');
const controller = require('./shortenController')

const router = new Router();

router.post('/', controller.create)
router.get('/:shortcode', controller.search)



module.exports = router;