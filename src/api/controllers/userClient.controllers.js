const UserClient = require('../models/userClient.model')
const { generateToken } = require('../../utils/token')
const bcrypt = require('bcrypt')
const Admin = require('../models/admin.model')

const getAllUserClients = async (req, res, next) => {
  try {
    const allUserClients = await UserClient.find().populate('pets')
    return res.status(200).json(allUserClients)
  } catch (error) {
    return next(error)
  }
}

const createUserClient = async (req, res, next) => {
  const { admin } = req.body
  try {
    const newUserClient = new UserClient(req.body)
    const userExists = await UserClient.findOne({ email: newUserClient.email })
    if (userExists) {
      return next('User already exists')
    }
    const createdUserClient = await newUserClient.save()
    const idClient = createdUserClient._id.toString()
    await Admin.findByIdAndUpdate(
      admin,
      { $push: { clients: idClient } },
      { new: true }
    )
    createUserClient.password = null
    return res.status(201).json(createdUserClient)
  } catch (error) {
    return next(error)
  }
}

const loginUserClient = async (req, res, next) => {
  try {
    const userClient = await UserClient.findOne({ email: req.body.email })
    if (!userClient) {
      return next('UserClient not register yet')
    } else if (!userClient.checked) {
      return next('User waiting for approval')
    }
    if (bcrypt.compareSync(req.body.password, userClient.password)) {
      const token = generateToken(userClient._id, userClient.email)
      return res.status(200).json(token)
    } else {
      return next('invalid password')
    }
  } catch (error) {
    return next(error)
  }
}

const updateUserClient = async (req, res, next) => {
  try {
    const { id } = req.params
    const newUserClient = new UserClient(req.body)
    newUserClient._id = id

    const updatedUserClient = await UserClient.findByIdAndUpdate(id, req.body, {
      new: true,
    })

    return res.status(200).json(updatedUserClient)
  } catch (error) {
    return next(error)
  }
}

const deleteUserClient = async (req, res, next) => {
  try {
    const { id } = req.params
    const userClient = await UserClient.findByIdAndDelete(id)

    return res.status(200).json(userClient)
  } catch (error) {
    return next(error)
  }
}

const getUserClientByID = async (req, res, next) => {
  try {
    const { id } = req.params
    const userCLientByID = await UserClient.findById(id)
    return res.status(200).json(userCLientByID)
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  getAllUserClients,
  createUserClient,
  updateUserClient,
  deleteUserClient,
  getUserClientByID,
  loginUserClient,
}
