const mongoose = require("mongoose");

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
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
    rol: {
      type: String,
      required: true,
      trim: true,
      default: "userClient",
    },
    validate: { type: Boolean, required: true, default: false },
  },

  { timestamps: true }
);

const UserClient = mongoose.model("UserClient", UserClientSchema);

module.exports = UserClient;
