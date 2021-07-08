require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const userRoute = require('./routes/User')
app.use('/user', userRoute)

const empRoute = require('./routes/Employee')
app.use('/emp', empRoute)

app.use(cors())
app.use(express.static('public'));

//===================== For DB Connection ============================
var url = process.env.DB_URL
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
var db = mongoose.connection;
db.once('open', () => {console.log("MongoDB connection is success")})
db.on('error', error=>console.log(error));

app.get('/index',function (req,res) {
    res.send("Confirmation from the server");
});

app.listen(8000, () =>{
    console.log('Server up at 8000')
});