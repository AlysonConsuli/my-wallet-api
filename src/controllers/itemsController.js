import db from '../db.js'

export const getItems = async (req, res) => {
    try {
        const { user } = res.locals
        res.status(201).send(user.items);

    } catch {
        console.log('Erro ao pegar os itens')
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
        console.log('Erro ao postar o item')
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
        console.log('Erro ao apagar item')
        res.sendStatus(500)
    }
}