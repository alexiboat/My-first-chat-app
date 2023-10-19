import Navbar from "seens/navbar"
import { Box, useMediaQuery } from "@mui/material"
import UserWidget from "seens/widgets/UserWidget"
import { useSelector } from "react-redux"
import MyPostWidget from 'seens/widgets/MyPostWidget'
import PostsWidget from "seens/widgets/PostsWidget"
import AdvertWidget from "seens/widgets/AdvertWidget"
import FriendsListWidget from "seens/widgets/FriendsListWidget"


const HomePage = ()=>{

    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
    const { _id, picturePath}= useSelector((state)=>state.user)
   
    return(
        <Box> 
         <Navbar/>
         <Box 
         width="100%"
         padding="2rem 6%"
         display={ isNonMobileScreens? "flex":"block"} 
         gap="0.5rem"
         justifyContent="space-between"        
         >

           <Box flexBasis={isNonMobileScreens ? "26%":undefined}>
              <UserWidget userId={_id} picturePath={picturePath}/>
           </Box>

           <Box flexBasis={isNonMobileScreens ? "42%":undefined}
                mt={isNonMobileScreens? undefined:"2rem"} >


             <MyPostWidget picturePath={picturePath}/>
             <PostsWidget userId={_id}/>
           </Box>

           {isNonMobileScreens && (
            
            <Box flexBasis="26%" > 
            <AdvertWidget/>
             <Box margin="2rem 0"/>
             <FriendsListWidget userId={_id}/>
            </Box>
           )}
         </Box>
        </Box>
    )
}
export default HomePage
