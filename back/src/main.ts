import express from 'express'
import { generateId } from './utils.js'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.EXPRESS_PORT || 3001
// const host = process.env.MYSQL_URL;
// const user = process.env.MYSQL_USER;
// const password = process.env.MYSQL_PASS;
// const database = process.env.MYSQL_DB;

const app = express()
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})