const express = require('express')
const cors = require('cors')
const { config } = require('./config')
const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('./swagger.json')

const app = express()
const port = config.port
const routerApi = require('./routes')
//CORS
app.use(cors())

//Parse JSON
app.use(express.json())

//Welcomet route
app.get('/', (req, res) => {
  res.send('Welcome to this scheduled task API')
})

// Route for documentation
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

// Router of the Api
routerApi(app)

// Pege not found
app.use('*', (req, res) => {
  res.send('Page not found')
})

app.listen(port, () => {
  console.log(`Server on port ${port}`)
})
