import express from "express";
import colors from "colors";
import { config } from "dotenv";
import path from "path";
import goalRoutes from "./routes/goalRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { connectDB } from "./config/db.js";

config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./client/build"));

app.use("/api/goals", goalRoutes);
app.get("/", (req, res) => {
  res.status(200).send("./client/build/index.html");
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
