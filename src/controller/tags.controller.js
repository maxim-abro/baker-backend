const genericCrud = require('./generic.controller')
const boom = require('boom')
const { Tag } = require('../model')

module.exports = {
  ...genericCrud(Tag)
}
