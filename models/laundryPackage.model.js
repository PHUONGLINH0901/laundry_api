import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    expiry_date: {
      type: Date,
      required: true,
    },

    discount_percent: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export const LaundryPackage = mongoose.model(
  "LaundryPackage",
  schema,
  "laundry_packages"
);
