import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Users } from "../models/users.model.js";
import Admin from "../models/admin.model.js";

/**
 * Middleware xác thực theo role
 * @param {"user" | "admin"} role
 */
export const usersAuthMiddleware = (role) => {
    return async (req, res, next) => {
        try {
           const authHeader = req.headers.authorization;
            const token =
                authHeader && authHeader.startsWith("Bearer ")
                    ? authHeader.split(" ")[1]
                    : req.cookies?.token;


            // 1. Không có token
            if (!token) {
                return res.status(401).json({
                    code: "error",
                    message: "Bạn cần đăng nhập trước!"
                });
            }

            // 2. Verify token
            const decode = jwt.verify(token, process.env.JWT);

            /* ================= USER ================= */
            if (role === "user") {
                if (decode.role !== "user") {
                    return res.status(403).json({
                        code: "error",
                        message: "Không có quyền truy cập!"
                    });
                }

                const user = await Users.findById(decode.id  );

                if (!user) {
                    return res.status(401).json({
                        code: "error",
                        message: "User không hợp lệ!"
                    });
                }

                if (user.status === "lock") {
                    return res.status(403).json({
                        code: "error",
                        message: "Tài khoản đã bị khóa!"
                    });
                }

                req.user = {
                    id: user.id,
                    email: user.email,
                    fullName: user.fullName,
                    role: "user"
                };

                return next();
            }

            /* ================= ADMIN ================= */
            if (role === "admin") {
                if (decode.role !== "admin") {
                    return res.status(403).json({
                        code: "error",
                        message: "Không có quyền admin!"
                    });
                }

                const admin = await Admin.findById(decode.id);

                if (!admin) {
                    return res.status(401).json({
                        code: "error",
                        message: "Admin không hợp lệ!"
                    });
                }

                if (admin.status !== "active") {
                    return res.status(403).json({
                        code: "error",
                        message: "Tài khoản admin đã bị khóa!"
                    });
                }

                req.admin = {
                    id: admin.id,
                    username: admin.adminname,
                    role: "admin"
                };

                return next();
            }

            // Role không hợp lệ
            return res.status(403).json({
                code: "error",
                message: "Role không hợp lệ!"
            });

        } catch (error) {
            return res.status(401).json({
                code: "error",
                message: "Token không hợp lệ hoặc đã hết hạn!"
            });
        }
    };
};

/* ===================== ADMIN VALIDATION ===================== */

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
 * Validate body khi admin tạo / sửa user
 */
export const validateUserData = (req, res, next) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({
            code: "error",
            message: "Missing required fields: fullName, email, password"
        });
    }

    next();
};


