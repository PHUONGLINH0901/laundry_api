import mongoose from "mongoose";

export const database = async () => {
    try {
        await mongoose.connect(process.env.DATBASE_URL)
        console.log("Ket noi database thanh cong!")
    } catch (error) {
        console.log("Ket noi database that bai!")
    }
}