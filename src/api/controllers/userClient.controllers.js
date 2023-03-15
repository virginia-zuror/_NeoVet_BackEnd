const UserClient = require('../models/userClient.model')

const getAllUserClients = async (req, res, next) => {
  try {
    const allUserClients = await UserClient.find().populate('pets')
    return res.status(200).json(allUserClients)
  } catch (error) {
    return next(error)
  }
}

const createUserClient = async (req, res, next) => {
  try {
    const newUserClient = new UserClient(req.body)
    const createdUserClient = await newUserClient.save()
    return res.status(201).json(createdUserClient)
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
}
