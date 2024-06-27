const jwt = require("jsonwebtoken")
require("dotenv").config()
const auth = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.secretKey)
            if (decoded) {
                console.log("decoded", decoded)
                // console.log("decoded", decoded.userID)
                req.body.userID = decoded.userID
                req.body.userName = decoded.userName
                next()
            }
            else {
                res.json({ msg: "you are not verified" });
            }
        } catch (error) {
            res.json({ err: error.message })
        }
    }
    else {
        res.json({ error: "Please Login First" });
    }
}

module.exports = {
    auth
}