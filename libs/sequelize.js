const { Sequelize } = require('sequelize')
const { config } = require('../config')
const setupModels = require('../db/models')

// Config the user of the Data Base
const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)

// Generate the conection through sequelize
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`
const sequilize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: false,
})

// Set the models of the Data Base
setupModels(sequilize)

// Syncronize the models with the option of alter it, if there are changes in the model.
sequilize.sync({ alter: true })

module.exports = sequilize
