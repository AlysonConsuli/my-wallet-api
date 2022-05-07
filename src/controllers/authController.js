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
        const token = uuid();
        const { user } = res.locals
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