import User from "../model/userModel.js";
import validator from "validator"
import bcrypt from 'bcrypt';
import { gentoken, gentoken1 } from "../config/token.js";

export  const registration= async(req,res)=>{
    try{
        const {name,email,password}= req.body;
        const existUser= await User.findOne({email})
        if(existUser){
            return res.status(400).json({message:"User already exists"})
        }
        if(!validator.isEmail(email)){
           return res.status(400).json({message:"Enter Valid Email"})
        }
        if(password.length<8){
            return res.status(400).json({message:"Enter Strong password"})
        }
        let hashPassword= await bcrypt.hash(password,10)

        const user = await User.create({name,email,password:hashPassword}) 
        let token = await gentoken(user._id)
        res.cookie("token",token,{
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7*24*60*1000
        })
        return res.status(201).json(user)
    }
    catch(error){
        console.log("sign up error")
        return res.status(500).json({message:`registration Error ${error}`})
    }
}

export const login= async(req,res)=>{
    try{
        let {email,password}= req.body;
        let user = await User.findOne({email})
        if(!user) return res.status(404).json({message:"User Not found"})
        let isMatch= await bcrypt.compare(password,user.password)
        if(!isMatch)  return res.status(400).json({message:"Incorrect Password"})
           
            let token = await gentoken(user._id)
            res.cookie("token",token,{
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7*24*60*1000
        })
        return res.status(201).json(user)
    }catch(error){
        console.log("login error")
        return res.status(500).json({message:`Login Error ${error}`})
    }


}

export const logOut= async (req,res)=>{
 try{
res.clearCookie("token",{
    httpOnly: true,
    secure: true,
    sameSite: "none"
})
  return res.status(200).json({message:"Logout Successfully"})
 }catch(err){
    console.log("Logout error")
    return res.status(500).json({message:`Logout Error${error}`})
 }
}


export const googleLogin= async(req,res)=>{
    try{
     let {name,email}= req.body;
     let user = await User.findOne({email})
        if(!user){
            user= await User.create({
                name,email
            })
        }
           
            let token = await gentoken(user._id)
            res.cookie("token",token,{
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7*24*60*1000
        })
        return res.status(200).json(user)

    }catch(error){
        console.log("Google Login error")
        return res.status(500).json({message:`Google Login Error${error}`})
    }
}


export const adminLogin= async(req,res)=>{
    try{
      let {email , password}= req.body
       if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
        let token = await gentoken1(email)
            res.cookie("token",token,{
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1*24*60*1000
        })
        return res.status(200).json(token)
       }
       return res.status(400).json({message:"Invalid credentials"})
    }catch(error){
       console.log("Admin Login Error")
        return res.status(500).json({message:`Admin Login Error${error}`})
    }
}