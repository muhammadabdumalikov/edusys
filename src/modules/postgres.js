import { forbidden } from "joi";
import { Sequelize, DataTypes } from "sequelize";
import config from '../config'
import UserModel from "../models/UserModel.js";

const sequelize = new Sequelize(config.PG_CONNECTION_STRING)

async function postgres () {
    try {

        let db  = {}
        db.users = await UserModel(Sequelize, sequelize)

        await sequelize.sync({force: true})
        
    } catch (error) {
        console.log("DB ERROR ", error)
    }
}

export default postgres