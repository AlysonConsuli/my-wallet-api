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
        await db.collection("users").updateOne(user, {
            $push: {
                items: {
                    value: Number(value),
                    description,
                    type,
                    date
                }
            }
        })
        res.sendStatus(201)
    } catch {
        console.log('Erro ao postar o item')
        res.sendStatus(500)
    }
}