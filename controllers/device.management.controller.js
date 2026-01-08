import Device from "../models/device.management.model.js";
export const getDevices = async (req, res) => {
  try {
    const data = await Device.find();
    res.status(200).json(data);
  } catch (err) { res.status(500).json({ error: err.message }); }
};
