import { itemSchema } from "../schemas/itemSchema.js"

export const itemMiddleware = async (req, res, next) => {
    const validation = itemSchema.validate(req.body, { abortEarly: false })
    if (validation.error) {
        return res.sendStatus(422)
    }
    next()
}