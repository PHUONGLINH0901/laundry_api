import { Order } from "../models/order.model.js";
import { Users } from "../models/users.model.js";


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
    let orders;

    if (req.admin) {
      orders = await Order.find().sort({ createdAt: -1 });

      const userIds = orders.map(o => o.userId).filter(Boolean);

      const users = await Users.find(
        { _id: { $in: userIds } },
        { fullName: 1, phone: 1, email: 1 }
      );

      // map userId => user
      const userMap = {};
      users.forEach(u => {
        userMap[u._id.toString()] = u;
      });

      // gắn fullName vào order
      orders = orders.map(o => ({
        ...o.toObject(),
        customer: userMap[o.userId?.toString()] || null
      }));
    }

    else if (req.user) {
      orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    }

    else {
      return res.status(401).json({
        code: "error",
        message: "Chưa xác thực"
      });
    }

    res.json({
      code: "success",
      data: orders
    });

  } catch (error) {
    console.error("ORDER ERROR:", error);
    res.status(500).json({
      code: "error",
      message: "Lỗi truy vấn order"
    });
  }
};





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

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    if (!updatedOrder) return res.status(404).json({ message: "Not Found" });
    res.status(200).json(updatedOrder);
  } catch (err) { res.status(500).json({ error: err.message }); }
};