const express = require('express');

const router = express.Router();

const jwt =require('jsonwebtoken');//token


const userdata = require('../models/userdata');


//mongoose connect
const mongoose = require('mongoose');
//create db connection from mlab
const db = 'mongodb+srv://user_athul:Athul12345@mycluster.6mngc.azure.mongodb.net/firstDB?retryWrites=true&w=majority';
//check connection whether connect or not
mongoose.connect(db,{ useUnifiedTopology: true , useNewUrlParser: true },(err)=>{
    
    if(err) console.error('Error! ' + err);
    else console.log('Connected to mongodb');
});



router.get('/',(req,res)=>{

    res.send('FROM API');
});

//registration
router.post('/register',(req,res)=>{
    let userData = req.body //requesting all the data from body
    let user = new userdata(userData);

    user.save((err,registeredUser)=>{
        if(err) console.log(err);
        //else res.status(200).send(registeredUser); //details of reg. user including 'id'

        //send token as response
        else{
             let payload = {subject : user._id} //payload
             let token = jwt.sign(payload,'secertKey')// string value as 'secretKey', we can use any string
             res.status(200).send({token}) //send response back to the server


        }
    })
})

//login

router.post('/login' ,(req,res)=>{

    let userData = req.body
    userdata.findOne({email : userData.email} , (err,user)=>{ //checking loginEmail = registeredEmail
        if(err){
            console.log(err);
        }else if(!user){
            res.status(401).send('Invalid Email');
        }else if( user.password !== userData.password){
            res.status(401).send('Invalid Password');
        }else{

            let payload = {subject : user._id}
            let token = jwt.sign(payload,'secretKey')
            res.status(200).send({token})
            // res.status(200).send(user);
        }
    });
});



//// for verifying token 

function verifyToken(req,res,next){
    //check autherization field inside the request
    if(!req.headers.autherization){
        return res.status(401).send('Unautherized request');//if it is not there
    }
    // split auth. value followed by the index
    let token = req.headers.autherization.split(' ')[1]     //if it is there , extract the value inside autherization || assign token value in token variable
    // after split fun will return a array containing diff. tokens
    // index[0]=Bearer , index[1]=token value

    if(token === 'null'){
        return res.status(401).send('Unautherized request');//if token is empty

       

    }
     //verify the token using jwt library
     let payload = jwt.verify(token, 'secretKey')
     if(!payload){
         return res.status(401).send('Unautherized user');   //if there is not payload

     }
     // set sub. of payload to set userid of req
     // we are generating the token on the client side using the same sub. feild of payload
     req.userId = payload.subject;//if there is a payload

     //pass on the execution in next handler
     next()

}




//events

router.get('/events' ,(req,res)=>{
    let events = [
        {
            "_id" : "1",
            "name" : "Auto Expo",
            "description" : "lorem ipsum",
            "date" : "2012-04-23T18:25:43.511Z"
        },
        {
            "_id" : "2",
            "name" : "Auto Expo",
            "description" : "lorem ipsum",
            "date" : "2012-04-23T18:25:43.511Z"
        },
        {
            "_id" : "3",
            "name" : "Auto Expo",
            "description" : "lorem ipsum",
            "date" : "2012-04-23T18:25:43.511Z"
        },
        {
            "_id" : "4",
            "name" : "Auto Expo",
            "description" : "lorem ipsum",
            "date" : "2012-04-23T18:25:43.511Z"
        },
        {
            "_id" : "5",
            "name" : "Auto Expo",
            "description" : "lorem ipsum",
            "date" : "2012-04-23T18:25:43.511Z"
        },
        {
            "_id" : "6",
            "name" : "Auto Expo",
            "description" : "lorem ipsum",
            "date" : "2012-04-23T18:25:43.511Z"
        },
        {
            "_id" : "7",
            "name" : "Auto Expo",
            "description" : "lorem ipsum",
            "date" : "2012-04-23T18:25:43.511Z"
        },
        {
            "_id" : "8",
            "name" : "Auto Expo",
            "description" : "lorem ipsum",
            "date" : "2012-04-23T18:25:43.511Z"
        },
        {
            "_id" : "9",
            "name" : "Auto Expo",
            "description" : "lorem ipsum",
            "date" : "2012-04-23T18:25:43.511Z"
        },
        {
            "_id" : "10",
            "name" : "Auto Expo",
            "description" : "lorem ipsum",
            "date" : "2012-04-23T18:25:43.511Z"
        }
    ]
    res.json(events);//sending data into chrome(localhost)
});



// verifytoken is a second argument(first verify tokens , then api will exicuted)

router.get('/special' ,verifyToken, (req,res)=>{
    let specialevents = [
        {
            "_id" : "1",
            "name" : "Auto Expo Special",
            "description" : "lorem ipsum",
            "date" : "2012-04-23T18:25:43.511Z"
        },
        {
            "_id" : "2",
            "name" : "Auto Expo Special",
            "description" : "lorem ipsum",
            "date" : "2012-04-23T18:25:43.511Z"
        },
        {
            "_id" : "3",
            "name" : "Auto Expo Special",
            "description" : "lorem ipsum",
            "date" : "2012-04-23T18:25:43.511Z"
        },
        {
            "_id" : "4",
            "name" : "Auto Expo Special",
            "description" : "lorem ipsum",
            "date" : "2012-04-23T18:25:43.511Z"
        },
        {
            "_id" : "5",
            "name" : "Auto Expo Special",
            "description" : "lorem ipsum",
            "date" : "2012-04-23T18:25:43.511Z"
        },
        {
            "_id" : "6",
            "name" : "Auto Expo Special",
            "description" : "lorem ipsum",
            "date" : "2012-04-23T18:25:43.511Z"
        }
    ]
    res.json(specialevents);//sending data into chrome(localhost)
});









module.exports = router;