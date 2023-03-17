const Staff = require('../models/staff.model')
const { generateToken } = require('../../utils/token')
const bcrypt = require('bcrypt')
const { deleteImgCloudinary } = require('../../middlewares/files.middleware')
const Admin = require("../models/admin.model")


const getAllStaff = async (req, res, next) => {
  try {
    const allStaff = await Staff.find()
    return res.status(200).json(allStaff)
  } catch (error) {
    return next(error)
  }
}

const createStaff = async (req, res, next) => {
  const { admin } = req.body
  try {
    const newStaff = new Staff({
      ...req.body,
      avatar: req.file ? req.file.path : 'No Photo',
    })
    const staffExists = await Staff.findOne({ email: newStaff.email })
    if (staffExists) {
      return next('Staff already exists')
    }
    const createdStaff = await newStaff.save()
    const idStaff = createdStaff._id.toString()
    await Admin.findByIdAndUpdate(
      admin,
      { $push: { staff: idStaff } },
      { new: true }
    )
    createdStaff.password = null
    return res.status(201).json(createdStaff)
  } catch (error) {
    return next(error)
  }
}

const loginUserStaff = async (req, res, next) => {
  try {
    const staff = await Staff.findOne({ email: req.body.email })
    if (!staff) {
      return next('Staff not register yet')
    } else if (!staff.checked) {
      return next('User waiting for approval')
    }
    if (bcrypt.compareSync(req.body.password, staff.password)) {
      const token = generateToken(staff._id, staff.email)
      return res.status(200).json(token)
    } else {
      return next('invalid password')
    }
  } catch (error) {
    return next(error)
  }
}

const updateStaff = async (req, res, next) => {
  try {
    const { id } = req.params
    const newStaff = new Staff(req.body)
    newStaff._id = id

    const originalStaff = await Staff.findById(id)
    if (req.file) {
      deleteImgCloudinary(originalStaff.avatar)
      newStaff.avatar = req.file.path
    }
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
  loginUserStaff,
}
