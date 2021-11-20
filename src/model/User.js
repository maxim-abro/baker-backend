const {
  model,
  Schema,
} = require('mongoose')

const schema = new Schema({
  mail: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  }
})

module.exports = model('User', schema)
