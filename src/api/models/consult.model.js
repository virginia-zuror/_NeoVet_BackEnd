const mongoose = require('mongoose')

const ConsultSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    vet: {
      type: String,
      required: true,
      trim: true,
    },
    exp: {
      type: String,
      required: true,
      trim: true,
    },
    weight: {
      type: Number,
      required: false,
      trim: true,
    },
    diagnose: {
      type: String,
      required: false,
      trim: true,
    },
    treatment: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
)

const Consult = mongoose.model('Consult', ConsultSchema)

module.exports = Consult
