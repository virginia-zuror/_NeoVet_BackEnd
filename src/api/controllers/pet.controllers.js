const { deleteImgCloudinary } = require('../../middlewares/files.middleware')
const Pet = require('../models/pet.model')
const UserClient = require("../models/userClient.model")

const getAllPets = async (req, res, next) => {
  try {
    const allPets = await Pet.find().populate('record').populate('appoint')
    return res.status(200).json(allPets)
  } catch (error) {
    return next(error)
  }
}

const createPet = async (req, res, next) => {
  const { client } = req.body
  try {
    const newPet = new Pet({
      ...req.body,
      photo: req.file ? req.file.path : 'No Photo',
    })
    const createdPet = await newPet.save()
    const idPet = createdPet._id.toString()
    await UserClient.findByIdAndUpdate(
      client,
      { $push: { pets: idPet } },
      { new: true }
    )
    return res.status(201).json(createdPet)
  } catch (error) {
    return next(error)
  }
}

const updatePet = async (req, res, next) => {
  try {
    const { id } = req.params
    const newPet = new Pet(req.body)
    newPet._id = id

    const originalPet = await Pet.findById(id)
    if (req.file) {
      deleteImgCloudinary(originalPet.photo)
      newPet.photo = req.file.path
    }
    await Pet.findByIdAndUpdate(id, newPet)

    return res.status(200).json(newPet)
  } catch (error) {
    return next(error)
  }
}

const deletePet = async (req, res, next) => {
  try {
    const { id } = req.params
    const pet = await Pet.findByIdAndDelete(id)

    if (pet.photo) {
      deleteImgCloudinary(pet.photo)
    }
    return res.status(200).json(pet)
  } catch (error) {
    return next(error)
  }
}

const getPetByID = async (req, res, next) => {
  try {
    const { id } = req.params
    const petByID = await Pet.findById(id)
    return res.status(200).json(petByID)
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  getAllPets,
  createPet,
  updatePet,
  deletePet,
  getPetByID,
}
