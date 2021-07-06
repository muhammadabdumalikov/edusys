import phoneValidation from "../validations/phoneValidation.js"
import signupValidation from "../validations/signupValidation.js"

class UserController {
    static async checkPhone (req, res) {
        try {
            const data = await phoneValidation.validateAsync(req.body)
            let user = await req.postgres.users.findOne({
                where: {
                    phone: data.phone
                }
            })
            res.status(200).json({
                ok: true,
                exist: user ? true: false
            })
            console.log(user)
        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + ""
            })
        }

    }

    static async signUp (req, res) {
        try {
             const { name, bdate, gender, phone } = await signupValidation.validateAsync(req.body)
             const user = await req.postgres.users.create({
                 name: name,
                 bdate: bdate,
                 gender: gender == 1 ? "female" : "male", 
                 phone: phone
             })
             res.status(201).json({
                ok: true,
                message: "Successfully registered",
                data: user.dataValues
             })
        } catch (error) {

            if(error == "SequelizeUniqueConstraintError: Validation error"){
                error = "User already exist"
            }

            res.status(400).json({
                ok: false,
                message: error + ""
            })
        }
    }
}

export default UserController