
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  response: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

module.exports = commentSchema
