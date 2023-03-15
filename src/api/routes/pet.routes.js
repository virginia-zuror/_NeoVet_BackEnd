const express = require('express')
const { upload } = require('../../middlewares/files.middleware')
const {
  isAuthClient,
  isAuthAdmin,
  isAuthStaff,
} = require('../../middlewares/auth.middleware')

const PetRoutes = express.Router()

const {
  getAllPets,
  createPet,
  updatePet,
  deletePet,
  getPetByID,
} = require('../controllers/pet.controllers')

PetRoutes.get('/', [isAuthStaff, isAuthAdmin], getAllPets)
PetRoutes.post(
  '/',
  upload.single('photo'),
  [isAuthClient, isAuthAdmin, isAuthStaff],
  createPet
)
PetRoutes.patch(
  '/:id',
  upload.single('photo'),
  [isAuthClient, isAuthAdmin, isAuthStaff],
  updatePet
)
PetRoutes.delete('/:id', [isAuthAdmin, isAuthStaff], deletePet)
PetRoutes.get('/:id', [isAuthClient, isAuthAdmin, isAuthStaff], getPetByID)

module.exports = PetRoutes
