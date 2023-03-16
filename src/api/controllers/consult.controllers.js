const Consult = require('../models/consult.model.js')
const Pet = require('../models/pet.model')


const getAllConsults = async (req, res, next) => {
  try {
    const allConsults = await Consult.find()
    return res.status(200).json(allConsults)
  } catch (error) {
    return next(error)
  }
}

/* const createConsult = async (req, res, next) => {
  try {
    const newConsult = new Consult(req.body)
    const createdConsult = await newConsult.save()
    const id = createdConsult._id.toString()
    return res.status(201).json(createdConsult)
  } catch (error) {
    return next(error)
  }
} */
const createConsultByPetId = async (req, res, next) => {
  const { pet } = req.body
  try {
    const newConsultByPetId = new Consult(req.body)
    const createdConsultByPetId = await newConsultByPetId.save()
    const idConsult = createdConsultByPetId._id.toString()
    await Pet.findByIdAndUpdate(
      pet,
      { $push: { record: idConsult } },
      { new: true }
    )
    return res.status(201).json(createdConsultByPetId)
  } catch (error) {
    return next(error)
  }
}

const updateConsult = async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedConsult = await Consult.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    return res.status(200).json(updatedConsult)
  } catch (error) {
    return next(error)
  }
}

const deleteConsult = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedConsult = await Consult.findByIdAndDelete(id)
    return res.status(200).json(deletedConsult)
  } catch (error) {
    return next(error)
  }
}

const getConsultByID = async (req, res, next) => {
  try {
    const { id } = req.params
    const consultByID = await Consult.findById(id)
    return res.status(200).json(consultByID)
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  getAllConsults,
  updateConsult,
  deleteConsult,
  getConsultByID,
  createConsultByPetId,
}
