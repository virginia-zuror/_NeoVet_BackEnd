const express = require('express')
const {
  isAuthClient,
  isAuthAdmin,
  isAuthStaff,
} = require('../../middlewares/auth.middleware')

const ConsultRoutes = express.Router()

const {
  getAllConsults,
  createConsult,
  updateConsult,
  deleteConsult,
  getConsultByID,
} = require('../controllers/consult.controllers')

ConsultRoutes.get('/', [isAuthAdmin, isAuthStaff], getAllConsults)
ConsultRoutes.post('/', [isAuthStaff], createConsult)
ConsultRoutes.put('/:id', [isAuthStaff], updateConsult)
ConsultRoutes.delete('/:id', [isAuthStaff, isAuthAdmin], deleteConsult)
ConsultRoutes.get(
  '/:id',
  [isAuthAdmin, isAuthClient, isAuthStaff],
  getConsultByID
)

module.exports = ConsultRoutes
