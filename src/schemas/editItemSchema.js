import joi from "joi"

export const editItemSchema = joi.object({
    value: joi.number().required().positive(),
    description: joi.string().required()
})