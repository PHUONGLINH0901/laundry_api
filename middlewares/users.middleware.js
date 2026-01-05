// 
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Users } from "../models/users.model.js";

/**
 * Kiểm tra API Key (chỉ áp dụng cho production)
 */
export const checkAccess = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];

    if (process.env.NODE_ENV === "production" && !apiKey) {
        return res.status(403).json({
            code: "error",
            message: "No API Key provided"
        });
    }

    next();
};

/**
 * Validate dữ liệu user (create / update)
 */
export const validateUserData = (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            code: "error",
            message: "Missing required fields: name, email, password"
        });
    }

    next();
};

/**
 * Validate MongoDB ObjectId
 */
export const validateUserId = (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            code: "error",
            message: "Invalid user ID format"
        });
    }

    next();
};

/**
 * Middleware xác thực user bằng JWT
 */
export const usersMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                code: "error",
                message: "Bạn cần đăng nhập trước!"
            });
        }

        const decode = jwt.verify(token, process.env.JWT);

        const user = await Users.findOne({ email: decode.email });

        if (!user) {
            return res.status(401).json({
                code: "error",
                message: "Bạn cần đăng nhập trước!"
            });
        }

        // attach user info vào request
        req.user = {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            image: user.image || "",
            address: user.address || "",
            phone: user.phone
        };

        next();
    } catch (error) {
        return res.status(401).json({
            code: "error",
            message: "Token không hợp lệ hoặc đã hết hạn!"
        });
    }
};
