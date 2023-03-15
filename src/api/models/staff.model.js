const mongoose = require('mongoose')
const validator = require('validator')

const StaffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
    trim: true,
    default: 'vet',
    enum: ['vet', 'aux'],
  },
  col: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    validate: [validator.isEmail, 'Email not valid'],
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  rol: {
    type: String,
    enum: ['userClient', 'userAdmin'],
    default: 'userAdmin',
    required: true,
    trim: true,
  },
  validate: { type: Boolean, default: false },
})

const Staff = mongoose.model('Staff', StaffSchema)

module.exports = Staff
