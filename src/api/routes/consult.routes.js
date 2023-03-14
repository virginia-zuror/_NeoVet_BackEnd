const express = require('express')

const ConsultRoutes = express.Router()

const {
  getAllConsults,
  createConsult,
  updateConsult,
  deleteConsult,
  getConsultByID,
} = require('../controllers/consult.controllers')

ConsultRoutes.get('/', getAllConsults)
ConsultRoutes.post('/', createConsult)
ConsultRoutes.put('/:id', updateConsult)
ConsultRoutes.delete('/:id', deleteConsult)
ConsultRoutes.get('/:id', getConsultByID)

module.exports = ConsultRoutes
