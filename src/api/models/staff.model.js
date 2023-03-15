const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const StaffSchema = new mongoose.Schema(
  {
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
      minlength: [8, 'Min 8 characters'],
      maxlength: [15, 'Max 15 characters'],
    },
    rol: {
      type: String,
      enum: ['userClient', 'userAdmin'],
      default: 'userAdmin',
      required: true,
      trim: true,
    },
    checked: { type: Boolean, default: false },
  },
  { timestamps: true }
)

StaffSchema.pre('save', async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10)
    next()
  } catch (error) {
    next('Error hashing password', error)
  }
})

const Staff = mongoose.model('Staff', StaffSchema)

module.exports = Staff
