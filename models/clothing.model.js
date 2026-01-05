import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    service_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "services", // nếu có bảng service
      required: true,
    },
    subname: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      require: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const ClothingItemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    items: {
      type: [ItemSchema],
      default: [],
    },
    status: {
      type: String,
      default: "open", // open | close
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

export const ClothingItem = mongoose.model(
  "ClothingItem",
  ClothingItemSchema,
  "clothing_items"
);
