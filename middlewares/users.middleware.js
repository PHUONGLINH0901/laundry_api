import jwt from "jsonwebtoken"
import { Users } from "../models/users.model.js";
export const usersMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decode = jwt.verify(token, process.env.JWT);
        const users = await Users.findOne({
            email: decode.email
        });

        if (!users) {
            return res.status(400).json({
                code: "error",
                message: "Ban can dang nhap truoc khi dung api nay!!"
            })
        };

        req.users = {
            id: users.id,
            fullName: users.fullName,
            email: users.email,
            image: users.image ? users.image : "",
            address: users.address ? users.address : "",
            phone: users.phone
        };

        next();
    } catch (error) {
        res.status(400).json({
            code: "error",
            message: "Ban can dang nhap truoc khi dung api nay!!"
        })
    }
}