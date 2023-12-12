const MessageModel = require("../models/Message")


const addMessge = async (req, res) => {
    const {chatId,senderId,text} = req.body
    const message = new MessageModel({
        chatId,
        senderId,
        text
    })
    try {
        const result =await message.save()
        res.status(200).json(result)

    } catch (error) {
        res.status(500).json(error)

    }
}

const getMessge = async(req,res) => {
    const {chatId} = req.params
    // console.log(chatId)
    try{
        const result = await MessageModel.find({chatId})

        res.status(200).json({"result":result})
    }catch(error){
        res.status(500).json(error)

    }
}

module.exports = {addMessge,getMessge}