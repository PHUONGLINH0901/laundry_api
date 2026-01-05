import { FabricSoftener } from "../models/fabricSoftener.model.js";

export const getFabricSofteners = async (req, res) => {
  try {
    const fabricSofteners = await FabricSoftener.find();

    res.json({
      code: "success",
      data: fabricSofteners,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      code: "error",
      message: "Lỗi truy vấn fabric softener",
    });
  }
};
