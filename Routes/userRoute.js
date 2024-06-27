const express = require("express")
const { UserModel } = require("../Model/userModel")
// for hashing the password
const bcrypt = require("bcrypt")
require("dotenv").config()
// to genrate the token
const jwt = require("jsonwebtoken")

const userRouter = express.Router()

// registration
userRouter.post("/register", async (req, res) => {
    const { email, name, pass, age } = req.body
    // console.log(req.body);
    try {
        const user = await UserModel.findOne({ email })
        // console.log(user)
        if (user) {
            res.json({ msg: "User is already registerd" })
        } else {
            bcrypt.hash(pass, 5, async (err, hash) => {
                console.log(hash)
                if (hash) {
                    const newUser = await UserModel({ ...req.body, pass: hash })
                    newUser.save()
                    res.status(201).json({ msg: "User has been registered successfully...!" })
                }
                else {
                    res.status(401).json({ msg: err.message })
                }
            })
        }
    } catch (error) {
        res.status(401).json({ msg: err.message })
        console.log("Something went wrong");
    }
})

// login
userRouter.post("/login", async (req, res) => {
    const { email, name, pass, age } = req.body
    try {
        const user = await UserModel.findOne({ email })
        console.log("user", user)
        if (user) {
            bcrypt.compare(pass, user.pass, (err, result) => {
                if (result) {
                    // payload ---> secretkey ---> callback function
                    jwt.sign({ userID: user._id, userName: user.name }, process.env.secretKey, (err, token) => {
                        // console.log(token)
                        res.status(200).json({ msg: "Login Successfull", Token: token })
                    })
                }
            })
        }
        else {
            res.status(403).json({ err: "Wrong Credentials" })
        }
    } catch (error) {
        res.status(401).json({ msg: err.message })
    }
})

module.exports = {
    userRouter
}