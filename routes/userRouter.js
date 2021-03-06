const express = require('express')
const userModel = require('../models/userSchema')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')

const router = express.Router()

// router.get('/', async (req,res) => {
//     try{const users = await userModel.find()
//     res.status(200).json(users)
//     } catch(error){
//         console.log(error)
//     }
// })

router.post('/', [
    check('username', "Username is required from Middleware!").notEmpty(),
    check("email", "Please use a valid email! from middleware").isEmail(),
    check("password", "Please enter a password").notEmpty(),
    check("password", "Please enter a password with six or more characters").isLength({min: 6})
],

async (req, res) => {
    const userData = req.body

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.json(errors.array())
    }

    try{
        const userExist = await userModel.findOneAndDelete({email: userData.email})
        if (userExist) {
            return res.json({msg: "User already exist!"})
        }
        const SALT = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(userData.password, SALT)
        userData.password = hashedPassword

        const users = await userModel.create(userData)
        res.status(201).json(users)
    } catch (error) {
        console.log(error)
        res.status(400).json('Bad Request')
    }

})

module.exports = router