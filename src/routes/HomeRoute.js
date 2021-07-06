import express from 'express' 

const router = express.Router()

router.get('/', (req, res)=> res.send('2222'))

export default {
    path: '/',
    router
}