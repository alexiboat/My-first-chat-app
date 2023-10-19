import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/UserModel.js'



export const register = async(req, res)=>{
    try {
      const { firstName, lastName, email, password, picturePath, friends, 
        location, occupation}= req.body 
        const salt = await bcrypt.genSalt(10)

        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            firstName, lastName, email, password: hashPassword, picturePath, friends, 
        location, occupation, 
        viewedProfile: Math.floor(Math.random()*10000),
        impressions: Math.floor(Math.random()*10000)
        })

        const saveUser = await newUser.save()
        res.status(201).json(saveUser)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}
 
/**LOGIN  */

    export const login = async(req, res)=>{


    try {
       const {email, password}= req.body
       const user = await userModel.findOne({email:email})
       if(!user) return res.status(400).json({msg: 'Please Wrong User!'})
        
       const isMatched = await bcrypt.compare(password, user.password)
       if(!isMatched) return res.status(400).json({msg: 'Invalid password or emaill address'})

       const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
       delete user.password
       res.status(200).json({token, user})
       
    } catch (error) {
        res.status(500).json({message: err.message})
    }
}

 