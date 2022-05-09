import { editItemSchema } from "../schemas/editItemSchema.js"

export const editItemMiddleware = async (req, res, next) => {
    const validation = editItemSchema.validate(req.body, { abortEarly: false })
    if (validation.error) {
        return res.sendStatus(422)
    }
    next()
}