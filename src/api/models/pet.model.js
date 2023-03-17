const mongoose = require('mongoose')

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

const PetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    specie: {
      type: String,
      required: true,
      trim: true,
    },
    chip: {
      type: Number,
      required: false,
      trim: true,
    },
    breed: {
      type: String,
      required: true,
      trim: true,
    },
    weight: [{ type: mongoose.Schema.Types.Number, ref: 'Consult' }],
    gender: {
      type: String,
      enum: ['male', 'female', 'unknown'],
      required: true,
      trim: true,
    },
    record: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consult',
      },
    ],
    appoint: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
      },
    ],
    photo: {
      type: String,
      required: false,
      trim: true,
    },
    birth: {
      type: Date,
      required: false,
      trim: true,
      validate: {
        validator: (v) =>
          v instanceof Date &&
          v.getFullYear() >= 2000 &&
          v.getFullYear() <= currentYear,
        message: `Year between 2000 to the ${currentYear}`
    }},
  },
  {
    timestamps: true,
  }
)

const Pet = mongoose.model('Pet', PetSchema)

module.exports = Pet
