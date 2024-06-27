const mongoose = require("mongoose")


const noteSchema = mongoose.Schema({
    title: String,
    content: String,
    userName: String,
    userID: String
}, {
    versionKey: false
})


const noteModel = mongoose.model("note", noteSchema)


module.exports = {
    noteModel
}