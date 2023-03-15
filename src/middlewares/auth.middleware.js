const UserClient = require('../api/models/userClient.model')
const { verifyToken } = require('../utils/token')
const Admin = require('../api/models/admin.model')
const Staff = require('../api/models/staff.model')

const isAuthClient = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) {
    return next(new Error('Unauthorized'))
  }

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET)
    req.userClient = await UserClient.findById(decoded.id)
    next()
  } catch (error) {
    return next(error)
  }
}



const isAuthAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) {
    return next(new Error('Unauthorized'))
  }

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET)
    req.Admin = await Admin.findById(decoded.id)
    next()
  } catch (error) {
    return next(error)
  }
}



const isAuthStaff = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) {
    return next(new Error('Unauthorized'))
  }

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET)
    req.Staff = await Staff.findById(decoded.id)
    next()
  } catch (error) {
    return next(error)
  }
}

module.exports = { isAuthClient, isAuthAdmin, isAuthStaff }
