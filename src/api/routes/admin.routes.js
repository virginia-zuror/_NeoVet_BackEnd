const express = require('express')

const AdminRoutes = express.Router()

const {
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getAdminByID,
  loginUserAdmin,
} = require('../controllers/admin.controllers')

AdminRoutes.get('/', getAllAdmins)
AdminRoutes.post('/', createAdmin)
AdminRoutes.post('/login', loginUserAdmin)
AdminRoutes.patch('/:id', updateAdmin)
AdminRoutes.delete('/:id', deleteAdmin)
AdminRoutes.get('/:id', getAdminByID)

module.exports = AdminRoutes
