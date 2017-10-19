var mongoose = require('mongoose');
var User = require('../models/userModel');

var findAll = function(req, res, next){
     User.find(function(err, result){
            if(err){
                return res.json({success:false, message:'Somthing went wrong'});
            }else{
                
                // next();
                res.json({success:true, data: result});
            }
    })
}

var findPage = function(req, res, next){
   
    var skip = parseInt(req.params.index) * parseInt(req.params.limit);
    console.log(skip)
    User.find()
    .skip(skip)
    .limit(parseInt(req.params.limit))
    .sort('-createdAt')
    .exec(function(err, users){
        if(err) return next(err);

        res.json({success:true, data: users})
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
                res.json({success:true, message:'User was created', data:user});
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
exports.findPage = findPage;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;