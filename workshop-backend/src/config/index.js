const { sign } = require('jsonwebtoken');

require('dotenv').config()
//indicar el valor por defecto a la propiedad port
const config = {
  port: process.env.NODE_PORT || 3000,
  sign: process.env.SIGN || techEvents
}
module.exports = config;