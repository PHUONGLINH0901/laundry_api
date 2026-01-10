import { Users } from "../models/users.model.js";
import bcrypt from "bcrypt";


export const getUsers = async (req, res) => {
  try {
    const data = await Users.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const addUser = async (req, res) => {
  try {
    const { fullName, email, password, phone, role } = req.body;

    // 1️⃣ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 2️⃣ Tạo user
    const newUser = new Users({
      fullName,
      email,
      phone,
      role: role || "user",
      password: hashedPassword, // ✅ password đã mã hóa
      status: "active"           // ✅ tự set active
    });

    await newUser.save();

    // 3️⃣ Không trả password về client
    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      code: "success",
      message: "Tạo user thành công",
      data: userResponse
    });

  } catch (err) {
    res.status(500).json({ code: "error", message: err.message });
  }
};


export const updateUser = async (req, res) => {
  try {
    const { id } = req.params; 
    const updates = req.body;

    const updatedUser = await Users.findByIdAndUpdate(id, updates, { new: true });
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const lockUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Users.findByIdAndUpdate(
      id,
      { status: "locked" },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      code: "success",
      message: "User account locked",
      user
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
