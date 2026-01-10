import { Service } from "../models/service.model.js";

export const getServices = async (req, res) => {
  try {
    const services = await Service.find({
      status: "open",
      // service_tags: "hot",
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

export const updateServicePrice = async (req, res) => {
  try {
    const id = req.params.serviceId || req.params.id; 
    
    if (!id) {
      return res.status(400).json({ message: "Missing service ID" });
    }

    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        service_weight: Number(req.body.service_weight),
        service_tags: req.body.service_tags
      },
      { new: true }
    );

    if (!updatedService) return res.status(404).json({ message: "Not Found" });
    res.status(200).json(updatedService);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addService = async (req, res) => {
  try {
    const {
      service_name,
      description,
      status,
      discount,
      default_type,
      service_weight,
      service_duration,
      feedback_score,
      service_capacity,
      service_tags,
    } = req.body;

    const newService = new Service({
      service_name,
      description,
      status,
      discount,
      default_type,
      service_weight,
      service_duration,
      feedback_score,
      service_capacity,
      service_tags,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await newService.save();

    res.status(201).json(newService);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

