const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  response: {
    type: String,
    required: true
  },
  ownerName: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},
{
  timestamps: true
})

module.exports = mongoose.model('Comment', commentSchema)
