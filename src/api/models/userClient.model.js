const mongoose = require('mongoose')
const validator = require('validator')

const UserClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    adress: {
      type: String,
      required: true,
      trim: true,
    },
    telephone: {
      type: String,
      required: true,
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
    dni: {
      type: String,
      trim: true,
      required: true,
    },
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }],
    rol: {
      type: String,
      required: true,
      trim: true,
      default: 'userClient',
      enum: ['userClient', 'userAdmin'],
    },
    validate: { type: Boolean, required: true, default: false },
  },

  { timestamps: true }
)

const UserClient = mongoose.model('UserClient', UserClientSchema)

module.exports = UserClient
