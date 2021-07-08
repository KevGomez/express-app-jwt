const mongoose = require('mongoose')

const EmpSchema = new mongoose.Schema({
        empCode: {type: String, required: true},
        empName: {type: String, required: true},
        empMobile: {type: String, required: true},
        user: {type: String, required: true},
    }, 
    {collection: 'employees'}
)

const model = mongoose.model('Employee', EmpSchema)

module.exports = model