const express = require("express")
const cors = require("cors")
const { userRouter } = require("./Routes/userRoute")
const { noteRouter } = require("./Routes/noteRoute")
const { connection } = require("./Config/db")
require("dotenv").config()
const app = express()

// 
app.use(cors())

// to store the data in JSON format
app.use(express.json())


app.use("/users", userRouter)
app.use("/notes", noteRouter)

app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log(`Server is Running on PORT ${process.env.PORT}`)
    } catch (error) {
        console.log(error);
    }
})