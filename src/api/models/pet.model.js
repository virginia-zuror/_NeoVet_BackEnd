const mongoose = require('mongoose')

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
    weight: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Consult' }],
    gender: {
      type: String,
      enum: ['male', 'female', 'unknown'],
      required: true,
      trim: true,
    },
    age: {
      type: Number,
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
  },
  {
    timestamps: true,
  }
)

const Pet = mongoose.model('Pet', PetSchema)

module.exports = Pet
