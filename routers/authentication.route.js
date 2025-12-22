import { Router } from "express"
import { loginController, logoutController, otpConfirm, profileContoller, registerController, updateProfileController } from "../controllers/authentication.controller.js";
import { usersMiddleware } from "../middlewares/users.middleware.js";
import { loginValidate, registerValidate } from "../validates/authentication.validate.js";
import multer from "multer";
import { storage } from "../helpers/cloudinary.helper.js";

const router = Router();

const upload  = multer({
    storage: storage
})

router.post("/register", registerValidate, registerController);

router.post("/otp", otpConfirm);

router.post("/login", loginValidate, loginController);

router.get("/profile", usersMiddleware, profileContoller);

router.put("/profile/edit", usersMiddleware, upload.single("image"), updateProfileController)

router.get("/logout", logoutController)

export default router;