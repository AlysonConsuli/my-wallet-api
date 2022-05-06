import express, { json } from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import joi from 'joi'

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
        const user = req.body
        await db.collection('users').insertOne(user)
        //console.log(await db.collection('users').find({}).toArray())
        res.sendStatus(201)
    } catch {
        console.log('Erro ao cadastrar usuário')
        res.sendStatus(500)
    }
})

app.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await db.collection('users').findOne({
            email,
            password
        })
        if(!user){
            return res.sendStatus(404)
        }
        res.send(user).status(200)
    } catch {
        console.log('Erro ao cadastrar usuário')
        res.sendStatus(500)
    }
})

app.listen(5000, () => console.log('Server is running on: http://localhost:5000'))