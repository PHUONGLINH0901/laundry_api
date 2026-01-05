import { Service } from "../models/service.model.js";

export const getServices = async (req, res) => {
  try {
    const services = await Service.find({
      status: "open",
      service_tags: "hot",
    });

    res.json({
      code: "success",
      data: services,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      code: "error",
      message: "Lỗi truy vấn service",
    });
  }
};

export const getAddServices = async (req, res) => {
  try {
    const services = await Service.find({
      status: "open",
      service_tags: { $ne: "hot" },
    });

    res.json({
      code: "success",
      data: services,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      code: "error",
      message: "Lỗi truy vấn service",
    });
  }
};
