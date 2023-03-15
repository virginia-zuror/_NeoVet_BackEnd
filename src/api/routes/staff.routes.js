const express = require('express')

const StaffRoutes = express.Router()

const {
  getAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
  getStaffByID,
  loginUserStaff,
} = require('../controllers/staff.controllers')

StaffRoutes.get('/', getAllStaff)
StaffRoutes.post('/', createStaff)
StaffRoutes.put('/:id', updateStaff)
StaffRoutes.delete('/:id', deleteStaff)
StaffRoutes.get('/:id', getStaffByID)
StaffRoutes.post('/login', loginUserStaff)

module.exports = StaffRoutes
