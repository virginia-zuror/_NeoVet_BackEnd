const express = require("express")

const AppointmentRoutes = express.Router();

const {getAllAppointments, createAppointment, updateAppointment, deleteAppointment, getAppointmentByID} = require ("../controllers/appointments.controllers")

AppointmentRoutes.get("/", getAllAppointments)
AppointmentRoutes.post("/", createAppointment)
AppointmentRoutes.put("/:id", updateAppointment)
AppointmentRoutes.delete("/:id", deleteAppointment)
AppointmentRoutes.get("/:id", getAppointmentByID)

module.exports = AppointmentRoutes