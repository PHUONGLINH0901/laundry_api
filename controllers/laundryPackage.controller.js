import { LaundryPackage } from "../models/laundryPackage.model.js";

/**
 * @desc    Tạo gói giặt
 * @route   POST /api/v1/laundry-packages
 */
export const createLaundryPackage = async (req, res) => {
  try {
    const {
      id,
      name,
      description,
      price,
      expiry_date,
      discount_percent = 0,
    } = req.body;

    const exists = await LaundryPackage.findOne({ id });
    if (exists) {
      return res.status(400).json({
        message: "Laundry package already exists",
      });
    }

    const laundryPackage = await LaundryPackage.create({
      id,
      name,
      description,
      price,
      expiry_date,
      discount_percent,
    });

    return res.status(201).json({
      message: "Create laundry package success",
      data: laundryPackage,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Create laundry package failed",
      error: error.message,
    });
  }
};

/**
 * @desc    Lấy danh sách gói giặt
 * @route   GET /api/v1/laundry-packages
 */
export const getLaundryPackages = async (req, res) => {
  try {
    const packages = await LaundryPackage.find().sort({ price: 1 });

    return res.status(200).json({
      message: "Get laundry packages success",
      data: packages,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Get laundry packages failed",
      error: error.message,
    });
  }
};

/**
 * @desc    Lấy chi tiết gói giặt
 * @route   GET /api/v1/laundry-packages/:id
 */
export const getLaundryPackageById = async (req, res) => {
  try {
    const { id } = req.params;

    const laundryPackage = await LaundryPackage.findOne({ id });

    if (!laundryPackage) {
      return res.status(404).json({
        message: "Laundry package not found",
      });
    }

    return res.status(200).json({
      message: "Get laundry package success",
      data: laundryPackage,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Get laundry package failed",
      error: error.message,
    });
  }
};

/**
 * @desc    Cập nhật gói giặt
 * @route   PUT /api/v1/laundry-packages/:id
 */
export const updateLaundryPackage = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await LaundryPackage.findOneAndUpdate({ id }, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({
        message: "Laundry package not found",
      });
    }

    return res.status(200).json({
      message: "Update laundry package success",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Update laundry package failed",
      error: error.message,
    });
  }
};

/**
 * @desc    Xóa gói giặt
 * @route   DELETE /api/v1/laundry-packages/:id
 */
export const deleteLaundryPackage = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await LaundryPackage.findOneAndDelete({ id });

    if (!deleted) {
      return res.status(404).json({
        message: "Laundry package not found",
      });
    }

    return res.status(200).json({
      message: "Delete laundry package success",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Delete laundry package failed",
      error: error.message,
    });
  }
};
