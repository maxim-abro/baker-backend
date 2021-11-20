const { model, Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

const schema = new Schema({
  title: {
    type: String,
    default: ''
  },
  img: {
    type: String,
    default: '/img/default.jpg'
  },
  date: {
    type: String,
    default: new Date()
  },
  cookingTime: {
    type: String,
    default: ''
  },
  steps: [
    {
      img: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      }
    }
  ],
  description: {
    type: String,
    default: ''
  },
  likes: {
    types: Number,
    default: 0
  },
  category: {
    type: ObjectId,
    ref: 'Category'
  },
  tags: {
    type: [],
    default: []
  },
  ingredients: [
    {
      title: {
        type: String,
        default: ''
      },
      amount: {
        type: Number,
        default: ''
      },
      typeAmount: {
        type: String,
        default: 'гр'
      }
    }
  ],
  comments: [
    {
      author: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: ''
      },
      likes: {
        type: Number,
        default: 0
      }
    }
  ]
})


module.exports = model('Recipe', schema)
