const express = require('express')
const { upload } = require('../../middlewares/files.middleware')

const PetRoutes = express.Router()

const {
  getAllPets,
  createPet,
  updatePet,
  deletePet,
  getPetByID,
} = require('../controllers/pet.controllers')

PetRoutes.get('/', getAllPets)
PetRoutes.post('/', upload.single('photo'), createPet)
PetRoutes.patch('/:id', upload.single('photo'), updatePet)
PetRoutes.delete('/:id', deletePet)
PetRoutes.get('/:id', getPetByID)

module.exports = PetRoutes
