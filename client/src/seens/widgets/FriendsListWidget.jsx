import { Box, Typography, useTheme } from "@mui/material"
import Friend from "components/Friend"
import WidgitWrapper from "components/WidgitWrapper"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setFriends } from "state"






 const FriendsListWidget =({userId})=>{
    const [isLoading, setIsLoading] =useState(false)
    const dispatch = useDispatch()
    const {palette} = useTheme()
    const token = useSelector((state)=>state.token)
    const friends = useSelector((state)=>state.user.friends)
  
  
  //** getUserFriends */
    const  getUserFriends = async()=>{
        setIsLoading(true)
        const response = await fetch(`http://localhost:3001/users/${userId}/friends`, {
                method:"GET",
                headers:{
                    Authorization:`Bearer ${token}`
                },
        })
       const data = await response.json()
       
       dispatch(setFriends({friends:data}))
       setIsLoading(false)
      
    }

    useEffect(()=>{

     getUserFriends()

    },[])//eslint-disable-line react-hooks/exhaustive-deps


    return(
        <WidgitWrapper>
            <Typography
              color={palette.neutral.dark}
              variant="h5"
              fontWeight="500"
              sx={{mb:"1.5rem"}}
            >Friends List</Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
              {isLoading ? (<h3>Loading....</h3>):(friends.map((friend, i)=>(
                  
                  <Friend 
                     key={i}
                     friendId={friend._id}
                     name={`${friend.firstName} ${friend.lastName}`}
                     subTitle={friend.location}
                     userPicturePath={friend.picturePath}
                  />
              )))}
            </Box>
        </WidgitWrapper>
    )


 }


 export default FriendsListWidget