const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

//Funcion que genera tokens
//si no tenemos id o email nos devuelve un error
//Si tenemos id y email, generamos mediante el method .sign de jwt una especie de encriptado donde metemos id, email y el secreto. Le decimos cuando caduca mediante expiresIn.
const generateToken = (id, email) => {
  if (!id || !email) {
    throw new Error('Email or id are missing')
  }
  return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

//Funcion que valida tokens
const verifyToken = (token) => {
  if (!token) {
    throw new Error('Token is missing')
  }
  //Comprobamos que nuestro token esta generado con la clave secreta
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { generateToken, verifyToken }
