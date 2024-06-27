const express = require("express")
const { noteModel } = require("../Model/noteModel")
const { auth } = require("../Middleware/auth")

const noteRouter = express.Router()


noteRouter.use(auth)

// GET notes
// noteRouter.get("/", auth, async (req, res) => {
noteRouter.get("/", async (req, res) => {
    try {
        const notes = await noteModel.find({ userID: req.body.userID })
        res.status(200).send(notes)
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
})


// POST Notes / add new Notes
noteRouter.post("/add", async (req, res) => {
    try {
        const note = new noteModel(req.body)
        await note.save()
        res.status(201).json({ msg: "Note Created Successfully..", note: note })
    } catch (error) {
        res.status(401).json({ err: error.message })
    }
})


// Update Notes
noteRouter.patch("/update/:id", async (req, res) => {
    const { id } = req.params
    // console.log("id is",id);
    const userIDInNote = req.body.userID
    // console.log("userIDInNote :-", userIDInNote);
    try {
        const note = await noteModel.findOne({ _id: id })
        // console.log("note",note)
        const userIDInNoteCollection = note.userID
        if (userIDInNote === userIDInNoteCollection) {
            await noteModel.findByIdAndUpdate({ _id: id }, req.body)
            res.status(200).json({ msg: "Your Note has been updated Successfully.." })
        }
        else {
            res.status(401).json({ msg: "You are not Authorized" })
        }
    } catch (error) {
        res.status(403).json({ msg: error.message })
    }
})

// Delete Notes
noteRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params
    const userIDInNote = req.body.userID
    try {
        const note = await noteModel.findOne({ _id: id })
        const userIDInNoteCollection = note.userID
        if (userIDInNote === userIDInNoteCollection) {
            await noteModel.findByIdAndDelete({ _id: id })
            res.status(202).json({ msg: "Your note has been deleted successfully", deletedNote: note })
        }
        else {
            res.status(403).json({ msg: "You are not Authorized" })
        }
    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
})

module.exports = {
    noteRouter
}