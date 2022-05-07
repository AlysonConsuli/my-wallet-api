import db from '../db.js'

export const getItems = async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();
    if (!token) {
        return res.sendStatus(401);
    }
    const session = await db.collection('sessions').findOne({ token });
    if (!session) {
        return res.sendStatus(401);
    }

    try {
        const user = await db.collection("users").findOne({ _id: session.userId });
        res.status(201).send(user.items);

    } catch {
        console.log('Erro ao pegar os itens')
        res.sendStatus(500)
    }
}

export const postItems = async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();
    if (!token) {
        return res.sendStatus(401);
    }
    const session = await db.collection('sessions').findOne({ token });
    if (!session) {
        return res.sendStatus(401);
    }
    try {
        const { value, description, type, date } = req.body
        const user = await db.collection("users").findOne({ _id: session.userId });
        await db.collection("users").updateOne({
            _id: session.userId
        }, {
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