import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
      unique: true,
    },

    // thông tin khách hàng
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    customer_name: {
      type: String,
      required: true,
    },

    customer_phone: {
      type: String,
      required: true,
    },

    customer_address: {
      type: String,
      required: true,
    },

    // gói giặt được đặt
    laundry_package_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LaundryPackage",
      required: true,
    },

    package_name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discount_percent: {
      type: Number,
      default: 0,
    },

    final_price: {
      type: Number,
      required: true,
    },

    // trạng thái đơn
    status: {
      type: String,
      enum: [
        "pending", // mới đặt
        "confirmed", // admin xác nhận
        "processing", // đang giặt
        "completed", // hoàn thành
        "cancelled", // huỷ
      ],
      default: "pending",
    },

    // ngày giao – nhận
    pickup_date: {
      type: Date,
      required: true,
    },

    delivery_date: {
      type: Date,
    },

    note: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export const LaundryPackageOrder = mongoose.model(
  "LaundryPackageOrder",
  schema,
  "laundry_package_orders"
);
