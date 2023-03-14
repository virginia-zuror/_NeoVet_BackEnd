const express = require("express");

const UserClientsRoutes = express.Router();

const {
  getAllUserClients,
  createUserClient,
  updateUserClient,
  deleteUserClient,
  getUserClientByID,
} = require("../controllers/userClient.controllers");

UserClientsRoutes.get("/", getAllUserClients);
UserClientsRoutes.post("/", createUserClient);
UserClientsRoutes.patch("/:id", updateUserClient);
UserClientsRoutes.delete("/:id", deleteUserClient);
UserClientsRoutes.get("/:id", getUserClientByID);

module.exports = UserClientsRoutes;
