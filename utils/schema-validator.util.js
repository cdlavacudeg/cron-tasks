const { validate } = require('node-cron')

const bodySchema = {
  cron: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Cron expression is required',
      bail: true,
    },
    custom: {
      options: (cron) => {
        if (validate(cron)) {
          return true
        } else {
          return Promise.reject(`Cron expression: ${cron} is not valid`)
        }
      },
    },
  },
  url: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'url is required',
    },
  },
}

module.exports = { bodySchema }
