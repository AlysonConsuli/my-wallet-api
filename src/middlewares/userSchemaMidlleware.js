import db from "../db.js"
import { userSchema } from "../schemas/userSchema.js"

export const userSchemaMidlleware = async (req, res, next) => {
    const validation = userSchema.validate(req.body, { abortEarly: false })
    if (validation.error) {
        console.log(validation.error.details.map(detail => detail.message))
        return res.sendStatus(422)
    }
    try {
        const { email } = req.body
        const conflict = await db.collection('users').findOne({ email })
        if (conflict) {
            return res.sendStatus(409)
        }
        next()
    } catch {
        res.sendStatus(500)
    }
}