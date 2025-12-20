import Joi from "joi";

export const registerValidate = (req, res, next) => {
    try {
        const schema = Joi.object({
            fullName: Joi.string().min(5).max(50).required()
                .messages({
                    "any.required": "Ten bat buoc phai co!",
                    "string.empty": "Ten bat buoc phai co!",
                    "string.min": "Ten phai co it nhat 5 ky tu!",
                    "string.max": "Ten chi chua dai nhat 50 ky tu!"
                }),
            email: Joi.string().email().required()
                .messages({
                    "any.required": "Email bat buoc phai co!",
                    "string.empty": "Email bat buoc phai co!",
                    "string.email": "Email sai dinh dang!",
                }),
            phone: Joi.string().required()
                .messages({
                    "any.required": "So dien thoai bat buoc phai co!",
                    "string.empty": "So dien thoai bat buoc phai co!",
                }),
            password: Joi.string().required()
                .messages({
                    "any.required": "Mat khau bat buoc phai co!",
                    "string.empty": "Mat khau bat buoc phai co!",
                })
        })
        const { error } = schema.validate(req.body);
        if(error) {
            return res.status(400).json({
                code: "error",
                message: error.details[0].message
            })
        };

        next();
    } catch (error) {
        console.log(error)
        res.status(400).json({
            code: "error",
            message: "Loi phan register validate"
        })
    }
}

export const loginValidate = (req, res, next) => {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required()
                .messages({
                    "any.required": "Email bat buoc phai co!",
                    "string.empty": "Email bat buoc phai co!",
                    "string.email": "Email sai dinh dang!",
                }),
            password: Joi.string().required()
                .messages({
                    "any.required": "Mat khau bat buoc phai co!",
                    "string.empty": "Mat khau bat buoc phai co!",
                })
        })
        const { error } = schema.validate(req.body);
        if(error) {
            return res.status(400).json({
                code: "error",
                message: error.details[0].message
            })
        };
        
        next();
    } catch (error) {
        console.log(error)
        res.status(400).json({
            code: "error",
            message: "Loi phan login validate"
        })
    }
}