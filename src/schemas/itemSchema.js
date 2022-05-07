import joi from "joi"

export const itemSchema = joi.object({
    value: joi.number().required().positive(),
    description: joi.string().required(),
    type: joi.string().required().valid('entrada', 'saída'),
    date: joi.string().required()
})