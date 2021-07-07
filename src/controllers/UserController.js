import phoneValidation from "../validations/phoneValidation.js"
import signupValidation from "../validations/signupValidation.js"
import randomNumber from 'random-number'
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

    static async login (req, res) {
        try {
            const data = await phoneValidation.validateAsync(req.body)
            const user = await req.postgres.users.findOne({
                where: {
                    phone: data.phone
                }
                
            })
    
            if(!user) throw new Error("User not found")

            let gen = randomNumber.generator({
                min:  100000, 
                max:  999999,
                integer: true
              }) 
            
              let attempts = await req.postgres.attempts.create({
                  user_id: user.dataValues.id,
                  code: gen()
              })
              console.log(await attempts)

            res.status(200).json({
                ok: true,
                message: "Message sent",
                id: attempts.dataValues.id
            })
        } catch (error) {
            res.status(401).json({
                ok: false,
                message: error + ""
            })
        }
    }
}

export default UserController