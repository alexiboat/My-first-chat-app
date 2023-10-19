import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgitWrapper from "components/WidgitWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";



const PostWidget=({ postUserId, postId, name, description,location,picturePath,userPicturePath,likes,comments, })=>{
  const [isComments , setIsComments]  = useState(false)  
 const dispatch = useDispatch()
 const token = useSelector((state)=>state.token)
 const loggedInUserId = useSelector((state)=>state.user._id)
 const isLiked = Boolean(likes[loggedInUserId])
 const likesCount = Object.keys(likes).length
 
 

 const {palette} = useTheme()
  const main = palette.neutral.main
  const primary= palette.primary.main

  

  const patchLikes = async()=>{

   const response = await fetch(`http://localhost:3001/posts/${postId}/like`,{
           method:"PATCH",
            headers:{
            Authorization:`Bearer ${token}`,
              "Content-Type":"application/json"},
              body: JSON.stringify({userId:loggedInUserId})// to track the id of the user who has liked the post
   })
       const updatedPost = await response.json()//return updatedpost from the backend
       dispatch(setPost({post:updatedPost}))//update post
  }


   return(

   <WidgitWrapper m='2rem 0'>
      <Friend
      friendId={postUserId}
      name={name}
      subTitle={location}
      userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{mt:"1rem"}}>
        {description}
      </Typography>
      {picturePath && (
        <img 
        width="100%"
        height="auto"
        alt="post"
        style={{borderRadius:"0.75rem", mt:"0.75rem"}}
        src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}

      <FlexBetween mt='0.25rem'>
        <FlexBetween gap="1rem">
           <FlexBetween gap="0.3rem">

               <IconButton onClick={patchLikes}>
                   {isLiked ? (<FavoriteOutlined sx={{color:primary}}/>):(
                    <FavoriteBorderOutlined />
                   )}
               </IconButton>
               <Typography>{likesCount}</Typography>
           </FlexBetween>
           <FlexBetween  gap="0.5rem">
                <IconButton  onClick={()=>setIsComments(!isComments)}>
                   <ChatBubbleOutlineOutlined />
               </IconButton>
               <Typography>
                {comments.length}
               </Typography>
           </FlexBetween>
        </FlexBetween>

        <IconButton>
         <ShareOutlined/>
        </IconButton>
      </FlexBetween>

      {isComments && (

       <Box mt="0.5rem">
          {comments.map((comment, i)=>(
            <Box key={`${name}-${i}`}>
                <Divider/>
                <Typography sx={{color: main, m:"0.5rem", paddingLeft:"1rem"}}>{comment}</Typography>
            </Box>
          ))}
         <Divider/>
       </Box>

      )}
   </WidgitWrapper>

   )

}

export default PostWidget
