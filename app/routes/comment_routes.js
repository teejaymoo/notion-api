
const express = require('express')
const router = express.Router()
const Query = require('../models/query')
const { handle404 } = require('./../../lib/custom_errors')
const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })

// Create comment
router.post('/queries/:id', requireToken, (req, res, next) => {
  const commentData = req.body.comment
  const queryId = req.params.id
  Query.findById(queryId)
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
router.get('/queries/:id/comments', (req, res, next) => {
  const queryId = req.params.id
  Query.findById(queryId)
    .then(queries => {
      return queries.map(query => query.comment.toObject())
    })
    // respond with status 200 and JSON of the queries
    .then(queries => res.status(200).json({ queries: queries }))
    // if an error occurs, pass it to the handler

    .catch(next)
})

module.exports = router
