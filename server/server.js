const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');//cors
const jwt =require('jsonwebtoken');//token


const port = 3000;

const app = express();

app.use(cors());//cors

const api = require('./routes/api')

app.use(bodyParser.json());
app.use('/api',api);

app.get('/',(req,res)=>{
    res.send('hello from server');
    
})

app.listen(port,function(){

    console.log('Server running on localhost : '+ port);
})

