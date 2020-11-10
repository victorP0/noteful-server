require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const notefulRouter = require('./noteful-router')
const validateBearerToken = require('./validate-bearer-token')
const ArticlesService = require('./noteful-service')


const app = express()
app.use(cors())
app.use(notefulRouter)
//app.use(validateBearerToken)
app.use(helmet())


const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
    
app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
      response = { error: { message: 'server error' } }
    } else {
      console.error(error)
      response = { message: error.message, error }
    }
    res.status(500).json(response)
})

module.exports = app