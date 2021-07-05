import express from "express"
import http from 'http'
import fs from 'fs'
import path from "path"
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import postgres from './modules/postgres.js'

let __dirname = path.resolve(path.dirname(''))

const app = express()
const server = http.createServer(app)

server.listen(8001, ()=> console.log('Ready'))

app.use(helmet())
app.use(cors())
app.use(morgan('dev'))


