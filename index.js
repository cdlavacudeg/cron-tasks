const express = require('express')
const cors = require('cors')
const { config } = require('./config')
const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('./swagger.json')
const {
  logErrors,
  errorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler')
const response = require('./utils/response.util')

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
  response.error(req, res, 'Page not found', 400)
})

//Error handler
app.use(logErrors)
app.use(ormErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server on port ${port}`)
})
