const express = require("express");
const config = require("config");
const mongoose = require("mongoose"); // ODM
const cookieParser = require("cookie-parser");
const indexRouter = require("./routes/index.routes");
const viewRouter = require("./routes/views.routes");
const errorHandingMiddleware = require("./middlewares/errors/error-handing.middleware");
const exHbs = require("express-handlebars");

const PORT = config.get("PORT") || 3000;
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();
app.use(cookieParser());

app.use(express.json());

const hbs = exHbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.static("views"));

app.use("/", viewRouter); // FRONTEND
app.use("/api", indexRouter); // BACKEND

app.use(errorHandingMiddleware); // eng oxirida

async function start() {
  try {
    const uri = config.get("dbUri");
    // console.log("MongoDB URI:", uri);

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
