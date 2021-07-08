const express = require('express')
const router = express.Router()
const bodyParser =require('body-parser')
const core = require('cors')
const UserModel = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.use(bodyParser.json());
router.use(core());

const JWT_SECRET=process.env.JWT_SECRET

router.post('/api/changepassword', (req,res) =>{
    try{
        const {token} = req.body;
        const user = jwt.verify(token, JWT_SECRET)
        console.log(user)
        res.json({status: 'ok'})
    }catch(e) {
        res.json({error: 'Error'})
    }
})

router.post('/api/login', async(req, res) =>{
    const {username, password} = req.body
    console.log(username, password)

    const user = await UserModel.findOne({username}).lean()

    if(!user) {
        return res.json({
            status: 'error',
            error: 'Invalid username/password'
        })
    }
    if(bcrypt.compare(password, user.password)){
        const token = jwt.sign({
            id: user._id,
            username: user.username
        }, JWT_SECRET)
        res.json({status: 'ok', data: token, username: username})
    }else{
        return res.json({
            status: 'error',
            error: 'Invalid username/password'
        })
    }
     
})

router.post('/api/register', async(req, res) => {
    if (!req.body)
        res.sendStatus(400)

    const {username, password: plainTextPassword, email, first_name, last_name} = req.body
    const password = await bcrypt.hash(plainTextPassword, 1)

    try{
        const job = await UserModel.create({
            username,
            password,
            email,
            first_name,
            last_name
        })
        console.log("User created: "+ job)
    }catch(error) {
        console.log(error)
        if(error.code === 11000){
            return res.json({status: 'error', message: 'Duplicate username added'})
        }
        else{
            throw error
        }
    }
    res.json({status: 'ok'})
});

module.exports = router;