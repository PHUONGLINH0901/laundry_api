import mongoose from "mongoose";

const schema = mongoose.Schema({
    user_logo_url: String,
    fullName: String,
    order_count: Number,
    account_status: String,

    user_type: String,
    loyalty_points: Number,
    preferred_payment_method: String,
    last_order_date: Date,
    last_login: Date,
    
    email: String,
    phone: String,
    password: String,
    image: String,
    address: String,
}, {
    timestamps: true
});

export const Users = mongoose.model("Users", schema, "users");