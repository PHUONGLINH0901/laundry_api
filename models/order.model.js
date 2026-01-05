import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: String,
    pakage: String,
    service: String,
    items: Array,
    washingLiquid: String,
    softener: String,
    otherService: Array,
    deliveryMethod: String,
    note: String,
    voucher: String,
    payment: String,
    total: String,
  },

  {
    timestamps: true, // ✅ TỰ SINH createdAt
  }
);

export const Order = mongoose.model("Order", schema, "orders");
