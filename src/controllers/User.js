const UserModel = require("../models/User")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt  = require("jsonwebtoken")
require("dotenv").config()
const register = async (req,res) => {
    const {name,email,password} = req.body
    // console.log(name,email,password)
    try{
        const user = await UserModel.findOne({email})
        if(user) return   res.status(400).json("User with the given email already exist!")
        if(!name || !email  || !password)return res.status(400).json("All fields are required!")
        if(!validator.isEmail(email)) return res.status(400).json("Email must be a valid email!")
        if(!validator.isStrongPassword(password))return res.status(400).json("Password must be a strong password!")

        bcrypt.hash(password, 5, async (err,hash) => {
            if(err){
                res.send({ "err": "Something went wrong" });
            }else {
                const userData = new UserModel({name,email,password:hash})
                await userData.save()
                res.status(200).json("Register Successfully!")
            }
        })

    }catch(err){
        res.status(500).send({"message": "Something went wrong","error":err} )
    }
}

const login = async (req,res) => {
    const {email,password} = req.body
    try{
        const user = await UserModel.findOne({email})
        if(!user) return   res.status(400).json({ message:"User does not exist." })

        // bcrypt.compare(password, user.password, async (err,result) => {
        //     if(err){
        //         res.send({ message:"Invalid Credentials!"});
        //     }else {
        //         var token = jwt.sign({_id:user._id}, process.env.key);
        //         res.status(200).json({user:user,token:token})
        //     }
        // })

        // if (!user) return res.status(400).json({ msg: "User does not exist. " })
        const isMatch = await bcrypt.compare(password, user.password)
    
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " })
        const token = jwt.sign({ id: user._id }, process.env.key)
        res.status(200).json({user:user,token:token})

    }catch(err){
        res.status(500).send({"message": "Something went wrong","error":err} )
    }
}

module.exports = {register,login}