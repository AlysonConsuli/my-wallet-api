import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid';

import db from '../db.js';

export const postUsers = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const passwordHash = bcrypt.hashSync(password, 10);
        await db.collection('users').insertOne({
            name,
            email,
            password: passwordHash,
            items: []
        })
        res.sendStatus(201)
    } catch {
        console.log('Erro ao cadastrar usuário')
        res.sendStatus(500)
    }
}

export const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await db.collection('users').findOne({ email })
        if (!user) {
            return res.sendStatus(404)
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return res.sendStatus(401)
        }
        const token = uuid();
        await db.collection('sessions').insertOne({
            userId: user._id,
            token
        })
        res.send({ ...user, token }).status(200)
    } catch {
        console.log('Erro ao fazer login')
        res.sendStatus(500)
    }
}