import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import router from "./router";
import errorMiddleware from "./middlewares/error-middleware";

dotenv.config();

const port = process.env["PORT"] || 3001;
const databaseURL = process.env["DATABASE"] || "";
mongoose.set('strictQuery', false);
const app = express();

app.use(express.json());
app.use(cors({ origin: "*", methods: ["GET", "POST"] }));
app.use('/api', router);
app.use(errorMiddleware);

const startApp = async () => {
  try {
    await mongoose.connect(databaseURL);
    console.log("Connection to database was successful");
    app.listen(port, () => console.log("App started on port: " + port));
  } catch(e) {
    console.log(e);
  };
};

startApp();
