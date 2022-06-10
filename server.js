const express = require('express')
require('dotenv').config()
const app = express()
const mongoConfig = require('./config/mongoConfig')
const contactRouter = require('./routes/contactRouter')
const userRouter = require('./routes/userRouter')
const authRouter = require('./routes/authRouter')
const PORT = 6000 

app.use(express.json())
app.use('/contact', contactRouter)
app.use('/users', userRouter)
app.use('/login', authRouter)

app.get('/', (req, res) => {
    res.status(200).json({message: 'Contacts'})
})

app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}`);
    mongoConfig()
})