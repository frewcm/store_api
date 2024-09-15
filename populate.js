import mongoose from "mongoose";
import { connectDB } from "./db/connect.js";
import productJson from "./products.json" assert { type: "json" };
import Product from "./models/product.js";
import dotenv from "dotenv";
dotenv.config();

const start = async () => {
  try {
    await connectDB();
    console.log("db connected");
    await Product.deleteMany();
    await Product.create(productJson);
    console.log("sucess!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
