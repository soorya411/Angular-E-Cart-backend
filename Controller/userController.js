const users = require('../Models/userSchema')
const jwt= require('jsonwebtoken')

//logic for register

exports.register=async(req,res)=>{
    //get user details from request

    const {username,email,password} = req.body
    try {
        
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(404).json("user already registered")
        }
        else{
            const newUser = new users({username,email,password})
            await newUser.save()  //to save new user details in mongodb
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(404).json(error)
    }
}

//login for  login

exports.login=async(req,res)=>{
    const {email,password}  = req.body
    try {
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            //token generation
    const token = jwt.sign({userId:existingUser._id},process.env.JWTKEY)
    res.status(200).json({existingUser,token})
    console.log(token);
        }
        else{
            res.status(402).json("Incorrect email or password")
        }
        
    } catch (error) {
        res.status(404).json(error)

    }
}