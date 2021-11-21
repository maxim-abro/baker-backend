const genericCrud = require('./generic.controller')
const boom = require('boom')
const { Recipe, Category, Tag, Ingredients } = require('../model')

module.exports = {
  ...genericCrud(Recipe),
  async postRecipe({ body }, res) {
    try {
      //модель рецепта
      const recipe = new Recipe(body)
      //сохраняем рецепт
      const newRecipe = await recipe.save()

      //////////Добавление в категории////////////////
      //ищем категорию в базе данных, которая есть в рецепте
      const foundCategory = await Category.findById(body.category)
      //Добавляем в категорию наш новый рецепт
      foundCategory.products.push(newRecipe.id)
      //Отправляем на базу данных обновленный рецепт
      const newCategory = await Category.findByIdAndUpdate(body.category, foundCategory, { new: true })
      //////////Добавление в категории////////////////


      ////////////Добавление в теги///////////////////////
      for (let item of recipe.tags) {
        const findTag = await Tag.findOne({title: item.toLowerCase() })
        if (findTag) {
          findTag.products.push(newRecipe.id)
          const newTag = await Tag.findByIdAndUpdate(findTag._id, findTag)
        } else {
          let tag = new Tag(
            {
              title: item.toLowerCase(),
              description: '',
              products: [newRecipe.id]
            })

          await tag.save()
        }
      }
      ////////////Добавление в теги///////////////////////

      ////////////Добавление в ингредиенты///////////////////////
      for (let item of recipe.ingredients) {
        const findIngredients = await Ingredients.findOne({ title: item.title.toLowerCase() })
        if (findIngredients) {
          findIngredients.products.push(newRecipe.id)
          const newIngredient = await Ingredients.findByIdAndUpdate(findIngredients._id, findIngredients)
        } else {
          let ingredient = new Ingredients(
            {
              title: item.title.toLowerCase(),
              description: '',
              products: [newRecipe.id]
          })
          await ingredient.save()
        }
      }
      ////////////Добавление в ингредиенты///////////////////////
      return res.status(200).send(newRecipe)
    } catch (e) {
      return res.status(400).send(boom.boomify(e))
    }
  }
}
