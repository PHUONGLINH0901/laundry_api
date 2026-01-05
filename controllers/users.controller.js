import { Users } from "../models/users.model.js";

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
    // Lưu toàn bộ dữ liệu từ Flutter gửi lên bao gồm user_name, phone_number...
    const newUser = new Users({ ...req.body, isActive: true });
    await newUser.save();
    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    const user = await Users.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User account locked", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};