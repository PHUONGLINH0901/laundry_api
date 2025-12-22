import mongoose from "mongoose";

const schema = mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    password: String,
    image: String,
    address: String,
}, {
    timestamps: true
});

export const Users = mongoose.model("Users", schema, "users");