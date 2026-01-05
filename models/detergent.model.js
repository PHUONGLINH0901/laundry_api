import mongoose from "mongoose";

const schema = mongoose.Schema({
  id: String,
  name: String,

  created_at: Date,
  updated_at: Date,
});

export const Detergent = mongoose.model("Detergent", schema, "detergents");
