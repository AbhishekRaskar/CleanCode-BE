const mongoose = require("mongoose")

// defined the datatype values of user credentials 
const userSchema = mongoose.Schema({
    name : String,
    email : String,
    pass : String,
    age : Number,
},{
    versionKey : false
})

// create a collection 
const UserModel = mongoose.model("user",userSchema)

module.exports={
    UserModel
}