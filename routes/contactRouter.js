const express = require('express')
const contactModel = require('../models/contactSchema')
const userModel = require('../models/userSchema')

const router = express.Router()


router.get('/', async (req, res) => {
    try{
        const contacts = await contactModel.find()
        res.status(200).json(contacts)
    } catch(error){
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    const contactData = req.body

    try{
        const contacts = await contactModel.create(contactData)
        res.status(201).json(contacts)
    }catch (error) {
        console.log(error)
        res.status(400).json('Bad Request')
    }
})

router.get('/', async (req,res) => {
    try{const users = await userModel.find()
    res.status(200).json(users)
    } catch(error){
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    const userData = req.body

    try{
        const users = await userModel.create(userData)
        res.status(201).json(users)
    } catch (error) {
        console.log(error)
        res.status(400).json('Bad Request')
    }

})

module.exports = router