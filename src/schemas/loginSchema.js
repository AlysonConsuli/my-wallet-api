import joi from "joi"

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,}$')),
})