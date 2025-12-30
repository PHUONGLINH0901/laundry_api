import { Router } from "express"
import { loginController, logoutController, otpConfirm, profileContoller, registerController, updateProfileController } from "../controllers/authentication.controller.js";
import { usersMiddleware } from "../middlewares/users.middleware.js";
import { loginValidate, registerValidate } from "../validates/authentication.validate.js";
import multer from "multer";
import { storage } from "../helpers/cloudinary.helper.js";

import { getAdmins } from "../controllers/admin.controller.js";
import { loginAdmin } from "../controllers/authentication.controller.js";


const router = Router();

const upload  = multer({
    storage: storage
})

//customer
router.post("/register", registerValidate, registerController);

router.post("/otp", otpConfirm);

router.post("/login", loginValidate, loginController);

router.get("/profile", usersMiddleware, profileContoller);

router.put("/profile/edit", usersMiddleware, upload.single("image"), updateProfileController)

router.get("/logout", logoutController);

//admin
router.get("/admin", getAdmins);
router.post("/admin/login", loginAdmin);




export default router;