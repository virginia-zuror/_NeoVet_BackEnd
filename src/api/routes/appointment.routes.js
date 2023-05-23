const express = require('express')
const {
  isAuthClient,
  isAuthAdmin,
  isAuthStaff,
} = require('../../middlewares/auth.middleware')
const AppointmentRoutes = express.Router()

const {
  getAllAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentByID,
} = require('../controllers/appointments.controllers')

AppointmentRoutes.get('/', [isAuthAdmin, isAuthStaff], getAllAppointments)
AppointmentRoutes.post(
  '/',
  [isAuthClient, isAuthAdmin, isAuthStaff],
  createAppointment
)
AppointmentRoutes.put('/:id', [isAuthAdmin, isAuthStaff], updateAppointment)
AppointmentRoutes.delete('/:id', [isAuthStaff, isAuthAdmin], deleteAppointment)
AppointmentRoutes.get(
  '/:id',
  [isAuthAdmin, isAuthClient, isAuthStaff],
  getAppointmentByID
)

module.exports = AppointmentRoutes
