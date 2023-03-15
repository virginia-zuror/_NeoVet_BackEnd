const express = require('express')
const {
  isAuthClient,
  isAuthAdmin,
  isAuthStaff,
} = require('../../middlewares/auth.middleware')

const UserClientsRoutes = express.Router()

const {
  getAllUserClients,
  createUserClient,
  updateUserClient,
  deleteUserClient,
  getUserClientByID,
  loginUserClient,
} = require('../controllers/userClient.controllers')

UserClientsRoutes.post('/', createUserClient)
UserClientsRoutes.post('/login', loginUserClient)
UserClientsRoutes.get('/', [isAuthAdmin, isAuthStaff], getAllUserClients)
UserClientsRoutes.patch(
  '/:id',
  [isAuthAdmin, isAuthClient, isAuthStaff],
  updateUserClient
)
UserClientsRoutes.delete('/:id', [isAuthAdmin, isAuthStaff], deleteUserClient)
UserClientsRoutes.get(
  '/:id',
  [isAuthClient, isAuthAdmin, isAuthStaff],
  getUserClientByID
)

module.exports = UserClientsRoutes
