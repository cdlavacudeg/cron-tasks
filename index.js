const express = require('express')
const cors = require('cors')
const { config } = require('./config')
const { models } = require('./libs/sequelize')

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
  res.json(tasks)
})

app.use('*', (req, res) => {
  res.send('Page not found')
})

app.listen(port, () => {
  console.log(`Server on port ${port}`)
})
