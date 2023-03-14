const Consult = require('../models/consult.model.js')

const getAllConsults = async (req, res, next) => {
  try {
    const allConsults = await Consult.find()
    return res.status(200).json(allConsults)
  } catch (error) {
    return next(error)
  }
}

const createConsult = async (req, res, next) => {
  try {
    const newConsult = new Consult(req.body)
    const createdConsult = await newConsult.save()
    return res.status(201).json(createdConsult)
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
  createConsult,
  updateConsult,
  deleteConsult,
  getConsultByID,
}
