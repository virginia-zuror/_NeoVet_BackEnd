const express = require('express')

const StaffRoutes = express.Router()

const {
  getAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
  getStaffByID,
} = require('../controllers/staff.controllers')

StaffRoutes.get('/', getAllStaff)
StaffRoutes.post('/', createStaff)
StaffRoutes.put('/:id', updateStaff)
StaffRoutes.delete('/:id', deleteStaff)
StaffRoutes.get('/:id', getStaffByID)

module.exports = StaffRoutes
