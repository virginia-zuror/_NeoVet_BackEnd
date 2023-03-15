const mongoose = require('mongoose')
const validator = require('validator')

const AdminSchema = new mongoose.Schema({
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
})

const Admin = mongoose.model('Admin', AdminSchema)

module.exports = Admin
