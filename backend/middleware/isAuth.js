import jwt from 'jsonwebtoken'


const isAuth= async(req,res,next)=>{
   try{
    console.log("isAuth check - origin:", req.headers.origin)
    console.log("isAuth check - cookie header:", req.headers.cookie)
    console.log("isAuth check - parsed cookies:", req.cookies)
    let {token}= req.cookies
    if(!token){
        console.log("isAuth: no token found in cookies")
        return res.status(400).json({message:"User does not have token"})
    }
    console.log("isAuth: token present")

    let verifyToken= jwt.verify(token,process.env.JWT_SECRET)
    if(!verifyToken){
        console.log("isAuth: token verification failed")
        return res.status(400).json({message:"User does not have a valid token"})
    }
    
    req.userId= verifyToken.userId
    next()

   }catch(error){
       console.error("isAuth error", error)
        return res.status(500).json({message:`isAuth Error${error}`})
   }
}

export default isAuth