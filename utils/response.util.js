const success = function (req, res, message, data = {}, status = 200) {
  res.status(status).send({
    statusCode: status,
    error: '',
    msg: message,
    data: data,
  })
}
const error = function (req, res, message, status = 500) {
  res.status(status).send({
    statusCode: status,
    error: message,
    msg: '',
    data: {},
  })
}
module.exports = {
  success,
  error,
}
