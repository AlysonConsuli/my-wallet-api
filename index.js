import express, { json } from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import joi from 'joi'
import bcrypt from 'bcrypt'

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
            password: passwordHash
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
        res.send(user).status(200)
    } catch {
        console.log('Erro ao fazer login')
        res.sendStatus(500)
    }
})

app.listen(5000, () => console.log('Server is running on: http://localhost:5000'))