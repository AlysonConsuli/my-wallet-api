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
        res.sendStatus(500)
    }
}

export const postAutoLogin = async (req, res) => {
    try {
        const { user } = res.locals
        res.status(200).send(user.name);

    } catch {
        res.sendStatus(500)
    }
}

export const deleteSession = async (req, res) => {
    try {
        const { session } = res.locals
        await db.collection('sessions').deleteOne(session)
        res.sendStatus(200);
    } catch {
        res.sendStatus(500)
    }
}