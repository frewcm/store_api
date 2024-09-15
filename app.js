import express from "express";
const app = express();
import dotenv from "dotenv";
import { connectDB } from "./db/connect.js";
dotenv.config();
import productsRoute from "./routes/products.js";
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";
import "express-async-errors";

// middleware
app.use(express.json());

// routes
app.use("/api/products", productsRoute);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8000;

const start = () => {
  try {
    app.listen(port, () => {
      connectDB();
      console.log(`SERVER STARTED ON PORT: ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
