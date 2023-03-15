const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const AdminSchema = new mongoose.Schema(
  {
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
    business: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    staff: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
      },
    ],
    clients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserClient',
      },
    ],
  },
  { timestamps: true }
)

AdminSchema.pre('save', async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10)
    next()
  } catch (error) {
    next('Error hashing password', error)
  }
})

const Admin = mongoose.model('Admin', AdminSchema)

module.exports = Admin
