const { ValidationError } = require('sequelize')
const response = require('./../utils/response.util')

function logErrors(err, req, res, next) {
  console.error(err)
  next(err)
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    response.error(
      req,
      res,
      {
        msg: err.name,
        errors: err.errors,
      },
      409
    )
  }
  next(err)
}

function errorHandler(err, req, res, next) {
  response.error(req, res, err.message)
}

module.exports = { logErrors, ormErrorHandler, errorHandler }
