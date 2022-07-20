const { models } = require('../libs/sequelize')
const response = require('../utils/response.util')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  const tasks = await models.Task.findAll()
  response.success(req, res, 'API get - List of url and scraped date', tasks)
})

module.exports = router
