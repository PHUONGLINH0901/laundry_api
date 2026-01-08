import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  stock: { type: Number, required: true },
  total: { type: Number, required: true },
  unit: { type: String, required: true },
  category: { type: String, required: true },
  slogan: { type: String, required: true },
  brand: { type: String, required: true }
}, { 
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.model("Inventory", inventorySchema, "inventories");
