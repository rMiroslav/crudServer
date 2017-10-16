var mongoose = require('mongoose');
var User = require('../models/userModel');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var findAll = function(req, res){
    User.find(function(err, result){
            if(err){
                return res.json({success:false, message:'Somthing went wrong'});
            }else{
                
                // next();
                res.json({success:true, data: result});
            }
    })
}

var createUser = function(req, res){
        console.log(req.body)
         var newUser = new User({  
            name:req.body.name,
            online_sales:req.body.online_sales,
            store_sales:req.body.store_sales,
            mail_order:req.body.mail_order
        });

          newUser.save(function(err, user){
            
            if(err){
                return res.json({success:false, message:'Error!'});
            }else{
                res.json({success:true, message:'User was created'});
            }

    });  
    
}

var updateUser = function(req, res, next){
 var id = req.params.id,
       body = req.body;

  User.findByIdAndUpdate(id, body, function(error, user) {
    // Handle the error using the Express error middleware
    if(error) return next(error);
    
    // Render not found error
    if(!user) {
      return res.status(404).json({
        message: 'Course with id ' + id + ' can not be found.'
      });
    }

    res.json(user);
  });
}

var deleteUser = function(req, res, next){
    User.findByIdAndRemove(req.params.id, function (err,user){
        if(err) { throw err; }
         
         if(user){
             res.json({success:true, user:user})
         }
    })
}

exports.findAll = findAll;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;