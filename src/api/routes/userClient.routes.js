const express = require('express')
const { isAuth } = require('../../middlewares/auth.middleware')

const UserClientsRoutes = express.Router()

const {
  getAllUserClients,
  createUserClient,
  updateUserClient,
  deleteUserClient,
  getUserClientByID,
  loginUserClient,
} = require('../controllers/userClient.controllers')

UserClientsRoutes.get('/', getAllUserClients)
UserClientsRoutes.post('/', createUserClient)
UserClientsRoutes.patch('/:id', updateUserClient)
UserClientsRoutes.delete('/:id', deleteUserClient)
UserClientsRoutes.get('/:id', [isAuth], getUserClientByID)
UserClientsRoutes.post('/login', loginUserClient)

module.exports = UserClientsRoutes
