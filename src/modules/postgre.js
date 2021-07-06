import pkg from "sequelize";
const { Sequelize, DataTypes } = pkg
import config from '../config.js'
let {PG_CONNECTION_STRING} = config
import UserModel from "../models/UserModel.js";

const sequelize = new Sequelize("postgres://postgres:4324@localhost:5432/edusys",)

async function postgres () {

    try {

        let db  = {}
        db.users = await UserModel(Sequelize, sequelize)

        await sequelize.sync({force: false})


        return db
        
    } catch (error) {
        console.log("DB ERROR ", error)
    }
}

export default postgres