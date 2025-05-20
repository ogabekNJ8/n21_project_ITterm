require("dotenv").config(); // bu default .env ni o‘qiydi
// console.log("secret_token:", process.env.secret_token);

const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const logger = require("../services/logger.service");

const PORT = config.get("PORT") || 3000;

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const requestLogger = require("../middlewares/loggers/request.logger");
const requestErrorLogger = require("../middlewares/loggers/request.error.logger");

const indexRouter = require("../routes/index.routes");
const errorHandingMiddleware = require("../middlewares/errors/error-handing.middleware");

// logger.log("info", "Oddiy log");
// logger.error("Error rejimi");
// logger.debug("debug rejimi");
// logger.warn("warn rejimi");
// logger.info("info rejimi");

// console.log(process.env.NODE_ENV);
// console.log(process.env.secret_token);
// console.log(config.get("secret_token"));

// console.log("Oddiy log");
// console.error("Error rejimi");
// console.debug("debug rejimi");
// console.warn("warn rejimi");
// console.info("info rejimi");
// console.trace("trace rejimi");
// console.table([["JS", 5], ["Java", 4]]);

// process.on("uncaughtException", (exception) => {
//   console.log("uncaughtException:", exception.message);
// })

// process.on("unhandledRejection", (rejection) => {
//   console.log("UnhandledRejection:", rejection);
// })

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(requestLogger);


app.use("/api", indexRouter); // backend


app.use(requestErrorLogger);

app.use(errorHandingMiddleware); // eng oxirida

async function start() {
  try {
    const uri = config.get("dbUri");
    console.log("MongoDB URI:", uri);

    await mongoose.connect(uri);
    console.log("MongoDB ga ulandi");

    app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Serverda xatolik:", error.message);
  }
}

start();
