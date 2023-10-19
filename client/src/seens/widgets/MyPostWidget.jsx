import {  EditOutlined, GifBoxOutlined,AttachFileOutlined,
         ImageOutlined,MicOutlined,MoreHorizOutlined, DeleteOutlined } from "@mui/icons-material";
import { Box,Divider, InputBase, useTheme,
         Typography,Button,IconButton, useMediaQuery } from "@mui/material";    
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween"; 
import UserImage from "components/UserImage";
import WidgitWrapper from "components/WidgitWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";




const MyPostWidget = ({picturePath})=>{

    const dispatch = useDispatch()
    const [isImage, setIsImage]= useState(false)// switch image space to post image
    const [image, setImage] = useState(null)
    const [post, setPost]=useState("")// this is actual post
    const {palette}=useTheme()
    const {_id } = useSelector((state)=>state.user)//id will be sent to the backend to find out whos is posting the content
    const {token } = useSelector((state)=>state.token)
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
    const mediumMain = palette.neutral.mediumMain
    const medium = palette.neutral.medium

   

    const handlePost = async()=>{
        const formData = new FormData()
        formData.append("userId", _id)
        formData.append("description", post)

        if(image){
            formData.append("picture", image)
            formData.append("picturePath", image.name)
        }

        const response = await fetch("http://localhost:3001/posts", {
            method:"POST",
            headers:{
                Authorization: `Bearer ${token}`
            },
            body:formData
        })
        const posts = await response.json()
        dispatch(setPosts({posts}))
        setImage(null)
        setPost("")
    }


    return(
        <WidgitWrapper>
            <FlexBetween gap='1.5rem'>
              <UserImage image={picturePath}/>
               <InputBase 
                placeholder="What's on your mind now.."
                onChange={(e)=>setPost(e.target.value)}
                value={post}
                sx={{
                    width: "100%",
                    backgroundColor: palette.neutral.light,
                    borderRadius:"2rem",
                    padding:"1rem 2rem",
                }}
               />
            </FlexBetween>
            {isImage && (

                <Box 
                  border={`1px solid ${medium}`}
                  borderRadius="5px"
                  mt="1rem"
                  p="1rem"
                >
                    <Dropzone
                            acceptedFiles=".jpg,.jpeg,.png"
                            multiple={false}
                            onDrop={(acceptedFiles)=>
                                    setImage( acceptedFiles[0])
                            
                                       }
                             >
                               {({

                                getRootProps, getInputProps
                               }) =>(
                                    <FlexBetween>
                                       <Box 
                                   {...getRootProps()}
                                   border={`2px dashed ${palette.primary.main}`}
                                   p="1rem"
                                   width='100%'
                                   sx={{"&:hover": {cursor:"ponter"}}}
                                  >
                                   <input  { ...getInputProps()}/>
                                   {!image ? (
                                    <p>Add Image here</p>
                                   ): (
                                    <FlexBetween>
                                        <Typography>
                                            {image.name}
                                        </Typography>
                                        <EditOutlined/>
                                    </FlexBetween>
                                   )}
                                  </Box>

                                  {image && (

                                     <IconButton
                                     onClick={()=>setImage(null)}
                                     sx={{
                                        width:"15%"
                                     }}
                                     >
                                       <DeleteOutlined/>
                                     </IconButton>

                                  )}
                                    </FlexBetween>
                                  
                               )}

                               </Dropzone>
                </Box>
            )}
            <Divider sx={{margin:"1.25rem 0"}}/>

            <FlexBetween>
                <FlexBetween 
                  gap="0.25rem"
                  onClick={()=>setIsImage(!isImage)}
                     >
                  <ImageOutlined sx={{color:mediumMain}}/>
                  <Typography
                     color="mediumMain"
                     sx={{"&: hover":{cursor:"pointer", color:medium}}}
                     >
                     Image
                  </Typography>
                </FlexBetween>

                {isNonMobileScreens ? (
                    <>

                    <FlexBetween gap='0.25'>
                       <GifBoxOutlined sx={{color:medium}}/>
                       <Typography color={medium}>Clip</Typography>
                    </FlexBetween>

                    <FlexBetween gap='0.25'>
                       <AttachFileOutlined sx={{color:medium}}/>
                       <Typography color={mediumMain}>Attachment</Typography>
                    </FlexBetween>

                    <FlexBetween gap='0.25'>
                       <MicOutlined sx={{color:mediumMain}}/>
                       <Typography color={mediumMain}>Audio</Typography>
                    </FlexBetween>

                    </>

                ):(<FlexBetween gap='0.25' >

                    <MoreHorizOutlined sx={{color:mediumMain}} />
                   </FlexBetween>)}
                    
                   <Button
                      disabled={!post}
                      onClick={handlePost}
                      sx={{
                         color:palette.background.alt,
                         backgroundColor:palette.primary.main,
                         borderRadius:"3rem",
                      }}
                   >POST</Button>
            </FlexBetween>
        </WidgitWrapper>
    )

}

export default MyPostWidget