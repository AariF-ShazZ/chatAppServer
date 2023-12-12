const express = require("express")
const app = express()
require("dotenv").config()
const port = process.env.port || 5000
const connection = require("./config/db")
const cors = require("cors")
const userRoute = require("./routes/User.js")
const chatRouter = require("./routes/Chat.js")
const messageRouter = require("./routes/Message.js")
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("This is the chat app")
})

app.use("/user",userRoute)
app.use("/chat",chatRouter)
app.use("/message",messageRouter)

app.listen(port, async () => {
    try {
        await connection
        console.log("Connected to the DB...");
    } catch (err) {
        console.log("Error while connecting to the DB: " + err);
    }
    console.log(`Server running at port ${port}`)
})  