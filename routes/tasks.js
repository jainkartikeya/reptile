var express = require('express');
var router = express.Router();


var jwt = require('jsonwebtoken');

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';
var User = require('../models/user');
var Task = require('../models/task.js');

router.post('/', function(req, res, next) {
    console.log(req.body.token[1]);
    var token = req.body.token[1];
    
    jwt.verify(token, 'IAMBATMAN', function(err, decoded) {
        if (err) {
            console.log(err);
            console.log(decoded);
        }
        else {
            var email = decoded._doc.email;
            
            
            Task.find({userEmail:email},function(err,tasks){
                if(err)
                    console.log(err);
                res.json(tasks); 
            });
            

        }
    });

});

router.post('/new',function(req, res, next) {
     var token = req.body.token[1];
    console.log(req.body.token[1]);
    jwt.verify(token, 'IAMBATMAN', function(err, decoded) {
        if (err) {
            console.log(err);
            console.log(decoded);
        }
        else {
            var email = decoded._doc.email;
            var task = new Task({
               userEmail : email,
               task : req.body.task,
               completed : false,
               started : req.body.startDate,
               endDate : req.body.endDate
            });
            
            
            task.save(function(err){
                if(err){
                    return res.json({
                        errorCode: "2"
                    });
                }
                else{
                    
                    return res.json({
                        errorCode: "0",
                        message : "success"
                    });
                }

            });

        }
    });
});


router.post('/delete',function(req, res, next) {
     var token = req.body.token[1];
    console.log(req.body.token[1]);
    jwt.verify(token, 'IAMBATMAN', function(err, decoded) {
        if (err) {
            console.log(err);
            console.log(decoded);
        }
        else {
            var email = decoded._doc.email;
            var task = new Task({
               userEmail : email,
               task : req.body.task,
               completed : false,
               started : req.body.date
            });
            
            var id = req.body.id;
            Task.find({_id : id}).remove().exec();
            res.json({
                errorCode : "1"
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
