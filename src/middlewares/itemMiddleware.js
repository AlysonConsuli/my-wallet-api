import { itemSchema } from "../schemas/itemSchema.js"

export const itemMiddleware = async (req, res, next) => {
    const validation = itemSchema.validate(req.body, { abortEarly: false })
    if (validation.error) {
        console.log(validation.error.details.map(detail => detail.message))
        return res.sendStatus(422)
    }
    next()
}