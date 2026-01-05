import mongoose from "mongoose";
const schema = new mongoose.Schema({
  device_type: String, brand: String, model: String, status: String,
  service: String, location: String, usage_duration: String,
  device_condition: String, capacity_used: String,
  operational_hours: String, last_error_code: String
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
export default mongoose.model("Device", schema, "devices_management");