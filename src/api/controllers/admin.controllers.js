const Admin = require('../models/admin.model')
const { generateToken } = require('../../utils/token')
const bcrypt = require('bcrypt')

const getAllAdmins = async (req, res, next) => {
  try {
    const allAdmins = await Admin.find().populate('staff').populate('clients')
    return res.status(200).json(allAdmins)
  } catch (error) {
    return next(error)
  }
}

const createAdmin = async (req, res, next) => {
  try {
    const newAdmin = new Admin(req.body)
    const adminExists = await Admin.findOne({ email: newAdmin.email })
    if (adminExists) {
      return next('Admin already exists')
    }
    const createdAdmin = await newAdmin.save()
    return res.status(201).json(createdAdmin)
  } catch (error) {
    return next(error)
  }
}

const loginUserAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email })
    if (!admin) {
      return next('Admin not register yet')
    }
    if (bcrypt.compareSync(req.body.password, admin.password)) {
      const token = generateToken(admin._id, admin.email)
      return res.status(200).json(token)
    } else {
      return next('invalid password')
    }
  } catch (error) {
    return next(error)
  }
}

const updateAdmin = async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedAdmin = await Admin.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    return res.status(200).json(updatedAdmin)
  } catch (error) {
    return next(error)
  }
}

const deleteAdmin = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedAdmin = await Admin.findByIdAndDelete(id)
    return res.status(200).json(deletedAdmin)
  } catch (error) {
    return next(error)
  }
}

const getAdminByID = async (req, res, next) => {
  try {
    const { id } = req.params
    const adminByID = await Admin.findById(id)
    return res.status(200).json(adminByID)
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getAdminByID,
  loginUserAdmin,
}
