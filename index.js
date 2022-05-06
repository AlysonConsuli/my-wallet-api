import express, { json } from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import joi from 'joi'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid';

const app = express()
app.use(cors())
app.use(json())
dotenv.config()

let db = null
const mongoClient = new MongoClient(process.env.MONGO_URI)
const promise = mongoClient.connect()
promise.then(() => db = mongoClient.db('my-wallet'))

app.post('/users', async (req, res) => {
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
})

app.post('/login', async (req, res) => {
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
})

app.get('/items', async (req, res) => {
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
})

app.post('/items', async (req, res) => {
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
})

app.listen(5000, () => console.log('Server is running on: http://localhost:5000'))