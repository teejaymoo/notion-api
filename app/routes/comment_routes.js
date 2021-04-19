
const express = require('express')
const router = express.Router()
const customErrors = require('../../lib/custom_errors')
const removeBlanks = require('../../lib/remove_blank_fields')
const Query = require('../models/query')
const { handle404 } = require('./../../lib/custom_errors')
const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })
const requireOwnership = customErrors.requireOwnership

// Create comment
router.post('/queries/:id/comments', requireToken, (req, res, next) => {
  const commentData = req.body.comment
  const queryId = req.params.id
  Query.findById(queryId)
    .populate('comments.owner')
    .then(handle404)
    .then(query => {
      query.comments.push(commentData)
      return query.save()
    })
    .then(query => res.status(201).json({ query }))
    .catch(next)
})

// INDEX
// GET
router.get('/queries/:id/index-comments', (req, res, next) => {
  const queryId = req.params.id
  Query.findById(queryId)
    .populate('comments.owner')
    // respond with status 200 and JSON of the queries
    .then(query => res.status(200).json({ comments: query.comments.toObject() }))
    // if an error occurs, pass it to the handler

    .catch(next)
})

router.patch('/queries/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.query.keeper
  Query.findById(req.params.id)
    .then(handle404)
    .then(query => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the keeper
      requireOwnership(req, query)
      // pass the result of Mongoose's `.update` to the next `.then`
      return query.comment.updateOne(req.body.comment)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
