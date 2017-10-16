
var mongoose = require('mongoose');


var User = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    online_sales:{
        type:Number,
        default: 0
    },
    store_sales:{
        type:Number,
        default: 0
    },
    mail_order:{
        type:Number,
        default:0
    }
});

var user = mongoose.model('user', User);

module.exports = user;