const router = require('express-promise-router')()
const checkJWTSign = require('../middlewares/jwtCheck.middleware')

const { tag } = require('../controller')


router.route('/:id').get(tag.get)
router.route('/').post(tag.create)
router.route('/').get(tag.getAll)
router.route('/:id').put(tag.update)
router.route('/:id').delete(tag.delete)

module.exports = router
