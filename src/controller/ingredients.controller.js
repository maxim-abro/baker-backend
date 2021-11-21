const genericCrud = require('./generic.controller')
const { Ingredients } = require('../model')

module.exports = {
  ...genericCrud(Ingredients)
}
