import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";

config();
const app = express();
const PORT = process.env.PORT;
const URL = process.env.URL;

mongoose
  .connect(URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
  })
  .catch((err) => console.log(err));
