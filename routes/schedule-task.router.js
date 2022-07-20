const express = require('express')
const response = require('./../utils/response.util')
const SchedulerService = require('./../services/schedule-task.service')
const service = new SchedulerService()

// Route validation
const { bodySchema } = require('./../utils/schema-validator.util')
const { checkSchema } = require('express-validator')
const { validateField } = require('./../utils/validate-fields')

// Router
const router = express.Router()

router.post('/', checkSchema(bodySchema), validateField, async (req, res) => {
  try {
    const { url, cron } = req.body
    await service.scheduleTask(cron, url)
    response.success(req, res, 'Task scheduled', { url, cron }, 201)
  } catch (error) {
    response.error(req, res, error.message)
  }
})
module.exports = router
