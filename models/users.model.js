import mongoose from "mongoose";//

const schema = mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    password: String,
    image: String,
    address: String,
});

export const Users = mongoose.model("Users", schema, "users");