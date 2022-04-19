import express from "express";
import colors from "colors";
import { config } from "dotenv";
import goalRoutes from "./routes/goalRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { connectDB } from "./config/db.js";

config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
