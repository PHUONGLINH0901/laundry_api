import { Order } from "../models/order.model.js";

export const createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      userId: new mongoose.Types.ObjectId(req.users.id),
    });

    res.json({
      code: "success",
      message: "Tạo order thành công",
      data: order,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      code: "error",
      message: "Lỗi tạo order",
    });
  }
};

export const getOrder = async (req, res) => {
    try {
        const id = req.users.id;

        const orders = await Order.find({
            userId: id
        });

        res.json({
            code: "success",
            data: orders
        })
    } catch (error) {
        res.status(400).json({
            code: "error",
            message: "Loi truy van order"
        })
    }
}

export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const checkOrder = await Order.findOne({
            _id: id,
            userId: req.users.id
        });

        if(!checkOrder) {
            res.status(404).json({
                code: "error",
                message: "Khong tim thay don hang nay!"
            })
        };

        await Order.deleteOne({
            _id: id,
        });
        
        res.json({
            code: "success",
            message: "Xoa order thanh cong"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            code: "error",
            message: "Loi phan delete order"
        })
    }
}