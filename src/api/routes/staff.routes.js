const express = require('express')
const { upload } = require('../../middlewares/files.middleware')

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
StaffRoutes.post('/', upload.single('avatar'), createStaff)
StaffRoutes.patch('/:id', upload.single('avatar'), updateStaff)
StaffRoutes.delete('/:id', deleteStaff)
StaffRoutes.get('/:id', getStaffByID)
StaffRoutes.post('/login', loginUserStaff)

module.exports = StaffRoutes
