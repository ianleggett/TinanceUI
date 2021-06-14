const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const users = () =>{
    var  UserSchema = new Schema({
        username : { type : String, default : ""},
        email : { type : String, default : ""},
        password : { type: String, default: "" },
        telephone: { type: String, default: "" },
        role : { type: String, default: "customer" },
        allowed : { type: Boolean, default: false },
    });
    return mongoose.model('users', UserSchema)
}


module.exports  = {
    users : users(),
}