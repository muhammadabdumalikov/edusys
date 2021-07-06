import dotenv from 'dotenv'
import path from 'path'
let __dirname = path.resolve(path.dirname(''))


dotenv.config({ path: path.resolve(__dirname, '../.env') })



export default {
    PG_CONNECTION_STRING: process.PG_CONNECTION_STRING
}