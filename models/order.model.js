import mongoose from "mongoose";

const schema = mongoose.Schema({
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
    userId: String,
}, {
    timestamps: true
});

export const Order = mongoose.model("Order", schema, "orders");