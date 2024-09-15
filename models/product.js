import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name field is required"],
    trim: true,
    maxlength: [20, "can not add more than 20 characters"],
  },
  price: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: '{VALUE} is not supported'
    },
    trim: true,
    maxlength: [20, "can not add more than 20 characters"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

const model = mongoose.model("product", productSchema);
export default model;
