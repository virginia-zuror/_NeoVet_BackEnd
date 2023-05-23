const Appointment = require('../models/appointment.model.js')
const Staff = require('../models/staff.model.js')
const Pet = require("../models/pet.model")

const getAllAppointments = async (req, res, next) => {
  try {
    const allAppointments = await Appointment.find()
    return res.status(200).json(allAppointments)
  } catch (error) {
    return next(error)
  }
}

const createAppointment = async (req, res, next) => {
  const {staff} = req.body
  const {pet} = req.body
  try {
    const newAppointment = new Appointment(req.body)
    const createdAppointment = await newAppointment.save()
    const idAppointment = createdAppointment._id.toString()
    await Staff.findByIdAndUpdate(
      staff,
      { $push: { appointments: idAppointment } },
      { new: true }
    )
    await Pet.findByIdAndUpdate(
      pet,
      { $push: { appoint: idAppointment } },
      { new: true }
    )
    return res.status(201).json(createdAppointment)
  } catch (error) {
    return next(error)
  }
}

const updateAppointment = async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    )
    return res.status(200).json(updatedAppointment)
  } catch (error) {
    return next(error)
  }
}

const deleteAppointment = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedAppointment = await Appointment.findByIdAndDelete(id)
    return res.status(200).json(deletedAppointment)
  } catch (error) {
    return next(error)
  }
}

const getAppointmentByID = async (req, res, next) => {
  try {
    const { id } = req.params
    const appointmentByID = await Appointment.findById(id)
    return res.status(200).json(appointmentByID)
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  getAllAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentByID,
}
