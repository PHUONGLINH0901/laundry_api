import mongoose from "mongoose";

export const validateId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const validateUserId = (req, res, next) => {
  const { id } = req.params;
  if (!validateId(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  next();
};