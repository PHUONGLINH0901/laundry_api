import { LaundryPackageOrder } from "../models/laundryPackageOrder.model.js";
import { LaundryPackage } from "../models/laundryPackage.model.js";

/**
 * 📌 Client đặt gói giặt
 * POST /api/client/laundry-package-orders
 */
export const createLaundryPackageOrder = async (req, res) => {
  try {
    const {
      order_id,
      customer_id,
      customer_name,
      customer_phone,
      customer_address,

      laundry_package_id,
      pickup_date,
      note,
    } = req.body;

    // 1️⃣ Validate bắt buộc
    if (
      !order_id ||
      !customer_id ||
      !customer_name ||
      !customer_phone ||
      !customer_address ||
      !laundry_package_id ||
      !pickup_date
    ) {
      return res.status(400).json({
        message: "Thiếu thông tin bắt buộc",
      });
    }

    // 2️⃣ Check order_id trùng
    const orderExists = await LaundryPackageOrder.findOne({ order_id });
    if (orderExists) {
      return res.status(409).json({
        message: "Mã đơn hàng đã tồn tại",
      });
    }

    // 3️⃣ Lấy thông tin gói giặt
    const laundryPackage = await LaundryPackage.findById(laundry_package_id);
    if (!laundryPackage) {
      return res.status(404).json({
        message: "Không tìm thấy gói giặt",
      });
    }

    // 4️⃣ Tính giá cuối
    const price = laundryPackage.price;
    const discount_percent = laundryPackage.discount_percent || 0;
    const final_price = price - Math.round((price * discount_percent) / 100);

    // 5️⃣ Tạo đơn
    const order = await LaundryPackageOrder.create({
      order_id,

      customer_id,
      customer_name,
      customer_phone,
      customer_address,

      laundry_package_id,
      package_name: laundryPackage.name,
      price,
      discount_percent,
      final_price,

      pickup_date,
      note,
    });

    return res.status(201).json({
      message: "Đặt gói giặt thành công",
      data: order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};

/**
 * GET /api/admin/laundry-package-orders
 */
export const getLaundryPackageOrders = async (req, res) => {
  try {
    const orders = await LaundryPackageOrder.find()
      .populate("laundry_package_id")
      .sort({ created_at: -1 });

    return res.status(200).json({
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};

/**
 * PUT /api/admin/laundry-package-orders/:id/status
 */
export const updateLaundryPackageOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, delivery_date } = req.body;

    const allowStatus = [
      "pending",
      "confirmed",
      "processing",
      "completed",
      "cancelled",
    ];

    if (!allowStatus.includes(status)) {
      return res.status(400).json({
        message: "Trạng thái không hợp lệ",
      });
    }

    const order = await LaundryPackageOrder.findByIdAndUpdate(
      id,
      {
        status,
        delivery_date,
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Không tìm thấy đơn hàng",
      });
    }

    return res.status(200).json({
      message: "Cập nhật trạng thái thành công",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};
/**
 * 📌 Client xem các gói giặt đã mua theo user
 * GET /api/client/laundry-package-orders/user/:userId
 */
export const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await LaundryPackageOrder.find({
      customer_id: userId,
    })
      .populate("laundry_package_id")
      .sort({ created_at: -1 });

    return res.status(200).json({
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};
/**
 * @desc    Lấy danh sách gói giặt cho client (tất cả packages active)
 * @route   GET /api/client/laundry-packages/available
 */
export const getAvailableLaundryPackages = async (req, res) => {
  try {
    const packages = await LaundryPackage.find().sort({ price: 1 });

    return res.status(200).json({
      message: "Get available laundry packages success",
      data: packages,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Get laundry packages failed",
      error: error.message,
    });
  }
};
