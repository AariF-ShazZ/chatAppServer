const express  = require("express")
const { getMessge, addMessge } = require("../controllers/Message")
const messageRouter = express.Router()

messageRouter.post("/",addMessge)
messageRouter.get("/:chatId",getMessge)

module.exports = messageRouter