const express = require('express')
const schedulerRouter = require('./schedule-task.router')
const scrapedRouter = require('./scraped.router')

function routerApi(app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/scraped', scrapedRouter)
  router.use('/schedule-task', schedulerRouter)
}

module.exports = routerApi
