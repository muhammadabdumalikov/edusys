import dotenv from 'dotenv'
import { env } from 'process'


dotenv.config()

export default {
    PG_CONNECTION_STRING: env.PG_CONNECTION_STRING
}