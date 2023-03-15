const Staff = require('../models/staff.model')

const getAllStaff = async (req, res, next) => {
  try {
    const allStaff = await Staff.find()
    return res.status(200).json(allStaff)
  } catch (error) {
    return next(error)
  }
}

const createStaff = async (req, res, next) => {
  try {
    const newStaff = new Staff(req.body)
    const createdStaff = await newStaff.save()
    return res.status(201).json(createdStaff)
  } catch (error) {
    return next(error)
  }
}

const updateStaff = async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedStaff = await Staff.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    return res.status(200).json(updatedStaff)
  } catch (error) {
    return next(error)
  }
}

const deleteStaff = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedStaff = await Staff.findByIdAndDelete(id)
    return res.status(200).json(deletedStaff)
  } catch (error) {
    return next(error)
  }
}

const getStaffByID = async (req, res, next) => {
  try {
    const { id } = req.params
    const staffByID = await Staff.findById(id)
    return res.status(200).json(staffByID)
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  getAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
  getStaffByID,
}
