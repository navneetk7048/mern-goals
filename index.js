import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import goalRoutes from "./routes/goalRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

config();
const app = express();
const PORT = process.env.PORT;
const URL = process.env.URL;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalRoutes);

app.use(errorHandler);

mongoose
  .connect(URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
