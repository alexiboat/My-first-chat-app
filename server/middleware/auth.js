import  jwt  from "jsonwebtoken";


export const verifyToken = async(req, res, next)=>{

try {
    let token = req.headers("Authorization")
    if (!token) {
        return res.status(400).json({msg:"Access Denied"})
    }
    if(token.startsWith("Bearer ")){
        token=token.slice(7, token.length).trimLeft() // token will be placed at the right side of the bearer
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified
    next()

} catch (err) {
   res.status(500).json({message: err.message}) 
}


}