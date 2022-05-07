import { userSchema } from "../schemas/userSchema.js"

export const userSchemaMidlleware = (req, res, next) => {
    const validation = userSchema.validate(req.body, { abortEarly: false })
    if (validation.error) {
        console.log(validation.error.details.map(detail => detail.message))
        return res.sendStatus(422)
    }

    next()
}