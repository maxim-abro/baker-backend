const router = require('express-promise-router')()
const { recipe } = require('../controller')


router.route('/:id').get(recipe.get)
router.route('/').post(recipe.postRecipe)
router.route('/').get(recipe.getAll)
router.route('/:id').put(recipe.update)
router.route('/:id').delete(recipe.delete)

module.exports = router
