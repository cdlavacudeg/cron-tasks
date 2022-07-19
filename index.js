const express = require('express')
const cors = require('cors')
const { config } = require('./config')

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

app.use('*', (req, res) => {
  res.send('Page not found')
})

app.listen(port, () => {
  console.log(`Server on port ${port}`)
})
