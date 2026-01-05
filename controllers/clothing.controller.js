import mongoose from "mongoose";
import { ClothingItem } from "../models/clothing.model.js";

export const getClothingItems = async (req, res) => {
  try {
    const { service_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(service_id)) {
      return res.status(400).json({
        code: "error",
        message: "service_id không hợp lệ",
      });
    }

    const objectId = new mongoose.Types.ObjectId(service_id);

    const clothingItems = await ClothingItem.find({
      status: "open",
      "items.service_id": objectId,
    });

    const filteredData = clothingItems.map((doc) => ({
      ...doc.toObject(),
      items: doc.items.filter(
        (item) => item.service_id.toString() === service_id
      ),
    }));

    return res.json({
      code: "success",
      data: filteredData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: "error",
      message: "Lỗi lấy danh sách clothing item",
    });
  }
};
