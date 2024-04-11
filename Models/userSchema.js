const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        reqiured:true
    },
    email:{
        type:String,
        reqiured:true
    },
    password:{
        type:String,
        reqiured:true
    }

})

const users = mongoose.model('users',userSchema);
module.exports=users;