import mongoose from "mongoose";

const schema = mongoose.Schema({
  service_name: String,
  description: String,
  status: String,
  discount: Number,
  default_type: String,
  service_weight: Number,
  service_duration: String,
  feedback_score: Number,
  service_capacity: Number,
  service_tags: Array,

  created_at: Date,
  updated_at: Date,
});

export const Service = mongoose.model("Service", schema, "services");
