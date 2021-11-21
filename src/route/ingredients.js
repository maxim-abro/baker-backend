const router = require('express-promise-router')()
const checkJWTSign = require('../middlewares/jwtCheck.middleware')

const { ingredients } = require('../controller')


router.route('/:id').get(ingredients.get)
router.route('/').post(ingredients.create)
router.route('/').get(ingredients.getAll)
router.route('/:id').put(ingredients.update)
router.route('/:id').delete(ingredients.delete)

module.exports = router
