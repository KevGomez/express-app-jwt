const express = require('express')
const router = express.Router()
const bodyParser =require('body-parser')
const core = require('cors')
const EmpModel = require('../model/employee')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.use(bodyParser.json());
router.use(core());

const JWT_SECRET=process.env.JWT_SECRET

router.post('/api/add', async(req, res) => {
    if (!req.body)
        res.sendStatus(400)

    const {empCode, empName, empMobile, user} = req.body;
    try{
        const job = await EmpModel.create({
            empCode,
            empName,
            empMobile,
            user 
        })
        console.log("Employee created: "+ job)
        res.json({status: 'ok'})
    }catch(error) {
        console.log(error)
        res.json({status: 'error', error: error});
        throw error;
    }
    
});

router.get('/api/getlist', async(req, res) => {
    try{
        var data = await EmpModel.find()
        res.json({status: 'ok', data: data})
    }catch(error) {
        console.log(error)
        res.json({status: 'error', error: error});
        throw error;
    }
    
});

router.delete('/api/delete/:id', async(req, res) => {
    try{
        var data = await EmpModel.findByIdAndDelete(req.params.id)
        res.json({status: 'ok', data: data})
    }catch(error) {
        console.log(error)
        res.json({status: 'error', error: error});
        throw error;
    }
});

router.put('/api/update/:id', async(req, res) => {
    try{
        var itemID = req.params.id
        var dataToUpdate = {
            empCode: req.body.empCode,
            empName: req.body.empName,
            empMobile: req.body.empMobile,
            user: req.body.user
        }
        var data = await EmpModel.updateOne({_id:itemID},dataToUpdate)
        res.json({status: 'ok', data: data})
    }catch(error) {
        console.log(error)
        res.json({status: 'error', error: error});
        throw error;
    }
});


module.exports = router;