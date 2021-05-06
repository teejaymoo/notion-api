const mongoose = require('mongoose')
const commentSchema = require('./comment')

const querySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  keeperName: String,
  comments: [commentSchema],
  keeper: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Query', querySchema)
