const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

const mongoDb = process.env.MONGO_URI;

let connection;

const connect = async () => {
  mongoose.set("strictQuery", true);

  if (connection) return connection;

  try {
    connection = await mongoose.connect(mongoDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connection.connection.on("error", (error) => {
      console.error(`DB connection error: ${error.message}`);
    });
    connection.connection.on("disconnected", () => {
      console.error(`DB disconnected, reconnecting...`);
      connect();
    });
    console.log(`Connect to DB: ${connection.connection.name}`);
  } catch (error) {
    console.error(`Not connect to DB: ${error.message}`);
  }
  return connection;
};

module.exports = { connect };
