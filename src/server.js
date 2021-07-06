import express from "express"
import http from 'http'
import fs from 'fs'
import path from "path"
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan';

import postgres from './modules/postgre.js'

async function main () {
    let db = await postgres()
    console.log(db)

    const app = express()
    const server = http.createServer(app)
    
    server.listen(8000, ()=> console.log('Ready'))
    
    app.use(helmet())
    app.use(cors())
    app.use(morgan('dev'))
    app.use(async (req, res, next)=>{
        req.postgres = await db
        next()
    })
    
}

main()



