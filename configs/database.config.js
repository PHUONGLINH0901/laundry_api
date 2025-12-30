import mongoose from "mongoose";

export const database = async () => {
  try {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("Lỗi DATABASE_URL");
    await mongoose.connect(url);
    console.log("Kết nối database thành công!");
  } catch (error) {
    console.log("Kết nối database thất bại!", error?.message);
    throw error;
  }
};
