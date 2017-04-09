var express = require('express');
var router = express.Router();


var jwt = require('jsonwebtoken');

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';
var User = require('../models/user');




router.post('/login',function(req,res,next){


   var password = encrypt(req.body.password);


    var userLogin = new User({
       email : req.body.email,
       password : password
    });

    //console.log(userLogin);

    User.findOne({email:userLogin.email},function(err,user){
       if(err){
           return res.json({
               errorCode : "0"
           });
       }

       if(!user){
           return res.json({
               errorCode : "1"
           });
       }

       if(user.password==userLogin.password){
           var token = jwt.sign(user, "IAMBATMAN", {
                
           });
           return res.json({
               errorCode : "2",
               
               token : token
           });

       }
        else{
            return res.json({
               errorCode : "3"
           });
        }

    });


});


router.post('/register',function(req,res,next){
    
    var password = encrypt(req.body.password);
    var user = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:password,
    });
    console.log(user);

    User.findOne({email:user.email},function(err,USER) {
       if(err){
           return res.json({
               errorCode: "0"
           });
       }
       if(USER){
           return res.json({
               errorCode: "1"
           });
       }
       else{
            console.log()
            user.save(function(err){
                if(err){
                    return res.json({
                        errorCode: "2"
                    });
                }
                else{
                    var token = jwt.sign(user.email, "IAMBATMAN", {
                    // expires in 24 hours
                    });
                    return res.json({
                        errorCode: "3",
                        token:token
                    });
                }

            });

       }
    });



});

function encrypt(msg){
    var text =  msg.toString();   
    console.log(text);
  var cipher = crypto.createCipher(algorithm,password);
  var crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password);
  var dec = decipher.update(text,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
}


module.exports = router;
