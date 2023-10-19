import userModel from "../models/UserModel.js";


export const getUser = async (req, res)=>{
    
     try {
        const {id}= req.params
        const user = await userModel.findById(id)
        res.status(200).json(user)
     } catch (err) {
        res.status(404).json({message: err.message})
     }
}

export const getUserFriends = async (req, res)=>{
   
    try {
        const {id}= req.params
        const user = await userModel.findById(id)

        const friends = await Promise.all(
            user.friends.map((id)=>userModel.findById(id))
        )

        const formattedFriends = friends.map(({_id, firstName, lastName, email, 
            occupation, location, picturePath }) =>{
                return {_id, firstName, lastName, email, 
                occupation, location, picturePath }})
            
                
             res.status(200).json(formattedFriends)   

    } catch (err) {
        res.status(404).json({message: err.message})
    }
}

/**UPDATE */
export const addRemoveFriends = async (req, res)=>{
    
    
    try {
        const {id}= req.params
        const {friendId}= req.params
        const user = await userModel.findById(id)
        const friend = await userModel.findById( friendId)

        if (user.friends.includes(friendId)){
         
            user.friends = user.friends.filter((id)=>id!==friendId)// remove user friend
            friend.friends =friend.friends.filter((id)=>id!==id)// remove all user friends frineds 
        }else{
            user.friends.push(friendId)
            friend.friends.push(id)
        }
         await user.save()
         await friend.save()

         const friends = await Promise.all(
            user.friends.map((id)=>userModel.findById(id))// map throgh the friends list and find all the friends IDs of the user
        )

         const formattedFriends = friends.map(({_id, firstName, lastName, email, 
            occupation, location, picturePath }) =>{
                return {_id, firstName, lastName, email, 
                occupation, location, picturePath }})

                res.status(200).json(formattedFriends)

    } catch (err) {
        res.status(404).json({message: err.message})
    }
}