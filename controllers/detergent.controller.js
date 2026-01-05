import { Detergent } from "../models/detergent.model.js";

export const getDetergents = async (req, res) => {
  try {
    const detergents = await Detergent.find();

    res.json({
      code: "success",
      data: detergents,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      code: "error",
      message: "Lỗi truy vấn detergent",
    });
  }
};
