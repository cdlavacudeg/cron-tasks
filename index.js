const express = require('express')
const cors = require('cors')
const { config } = require('./config')
const { models } = require('./libs/sequelize')
const { scheduleTask } = require('./controller')
const response = require('./utils/response.util')
const { bodySchema } = require('./utils/schema-validator.util')
const { checkSchema } = require('express-validator')
const { validateField } = require('./utils/validate-fields')

const app = express()
const port = config.port

//CORS
app.use(cors())

//Parse JSON
app.use(express.json())

//Basic routes

app.get('/', (req, res) => {
  res.send('Welcome to this scheduled task API')
})

app.get('/tasks', async (req, res) => {
  const tasks = await models.Task.findAll()
  response.success(req, res, 'API get - List of url and scraped date', tasks)
})

app.post(
  '/scheduled-task',
  checkSchema(bodySchema),
  validateField,
  async (req, res) => {
    try {
      const { url, cron } = req.body
      await scheduleTask(cron, url)
      response.success(req, res, 'Task scheduled', { url, cron }, 201)
    } catch (error) {
      response.error(req, res, error.message)
    }
  }
)

app.use('*', (req, res) => {
  res.send('Page not found')
})

app.listen(port, () => {
  console.log(`Server on port ${port}`)
})
