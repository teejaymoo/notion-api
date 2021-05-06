// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

const Query = require('../models/query')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// CREATE
// POST
router.post('/queries', requireToken, (req, res, next) => {
  // set keeper of new example to be current user
  console.log('The user object:', req.user)
  console.log('The incoming event data:', req.body)
  const queryData = req.body.query
  queryData.keeperName = req.user.username
  queryData.keeper = req.user._id

  Query.create(queryData)
    // respond to succesful `create` with status 201 and JSON of new "example"
    .then(query => {
      res.status(201).json({ query: query.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// Show
// Get
router.get('/queries/:id', (req, res, next) => {
  Query.findById(req.params.id)
    .then(handle404)
    .then(query => res.status(200).json({ query: query.toObject() }))
    .catch(next)
})
// INDEX
// GET
router.get('/queries', (req, res, next) => {
  Query.find()
    .then(queries => {
      return queries.map(query => query.toObject())
    })
    // respond with status 200 and JSON of the queries
    .then(queries => res.status(200).json({ queries: queries }))
    // if an error occurs, pass it to the handler

    .catch(next)
})
// UPDATE
// PATCH
router.patch('/queries/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.query.keeper
  Query.findById(req.params.id)
    .then(handle404)
    .then(query => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the keeper
      requireOwnership(req, query)
      // pass the result of Mongoose's `.update` to the next `.then`
      return query.updateOne(req.body.query)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /queries/
router.delete('/queries/:id', requireToken, (req, res, next) => {
  Query.findById(req.params.id)
    .then(handle404)
    .then(query => {
      // throw an error if current user doesn't own `example`
      requireOwnership(req, query)
      // delete the example ONLY IF the above didn't throw
      query.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
