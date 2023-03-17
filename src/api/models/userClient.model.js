const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const UserClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    address: {
      street: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      region: {
        type: String,
        required: true,
        trim: true,
      },
      postalCode: {
        type: String,
        required: true,
        trim: true,
      },

    },
    telephone: {
      type: String,
      required: true,
      trim: true,
      validate: [validator.isMobilePhone, "Enter a correct Phone Number"]
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
    checked: { type: Boolean, required: true, default: false },
  },

  { timestamps: true }
)

UserClientSchema.pre('save', async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10)
    next()
  } catch (error) {
    next('Error hashing password', error)
  }
})

const UserClient = mongoose.model('UserClient', UserClientSchema)

module.exports = UserClient
