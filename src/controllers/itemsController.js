import db from '../db.js'

export const getItems = async (req, res) => {
    try {
        const { user } = res.locals
        res.status(201).send(user.items);

    } catch {
        res.sendStatus(500)
    }
}

export const postItems = async (req, res) => {
    try {
        const { value, description, type, date } = req.body
        const { user } = res.locals
        const { items } = user
        await db.collection("users").updateOne(user, {
            $push: {
                items: {
                    value: Number(value),
                    description,
                    type,
                    date,
                    id: items.length ? Number(items[items.length - 1].id) + 1 : 0
                }
            }
        })
        res.sendStatus(201)
    } catch {
        res.sendStatus(500)
    }
}

export const deleteItem = async (req, res) => {
    try {
        const { user } = res.locals
        const { itemId } = req.params
        const item = user.items.find(obj => {
            return Number(obj.id) === Number(itemId)
        })
        await db.collection("users").updateOne(user, {
            $pull: { items: item }
        })
        res.sendStatus(200)
    } catch {
        res.sendStatus(500)
    }
}

export const uptadeItem = async (req, res) => {
    try {
        const { value, description } = req.body
        const { user } = res.locals
        const { itemId } = req.params
        await db.collection("users").updateOne(user,
            {
                $set: {
                    "items.$[item].value": Number(value),
                    "items.$[item].description": description
                }
            },
            { arrayFilters: [{ "item.id": Number(itemId) }] }
        )
        res.sendStatus(200)
    } catch {
        res.sendStatus(500)
    }
}