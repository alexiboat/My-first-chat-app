import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";



const PostsWidget = ({userId, isProfile=false})=>{
    //const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const posts = useSelector((state)=>state.posts)
    const token = useSelector((state)=>state.token)

       /** get all posts */
    const getPosts = async()=>{
        //setIsLoading(true)
        const response = await fetch("http://localhost:3001/posts", {
            method: "GET",
            headers:{Authorization:`Bearer ${token}`},
           
        })
       
        const data = await response.json()
       
        dispatch(setPosts({posts:data}))// add data to existing posts
        //setIsLoading(false)
    }

        /** get individual post */
    const getUserPosts = async()=>{
        //setIsLoading(true)
        const response = await fetch(`http://localhost:3001/posts/${userId}/posts`, {
            method: "GET",
            headers:{Authorization:`Bearer ${token}`},
           
        })
          
         
        const data = await response.json()
        
        dispatch(setPosts({posts:data}))
       // setIsLoading(false) 
    }

    useEffect(()=>{
     if(isProfile){
        getUserPosts()
     }else{
        getPosts()
     }

    },[]) //eslint-disable-line react-hooks/exhaustive-deps

    return(
        <>
        { posts.map(({ _id, 
              firstName,
              lastName,
              description,
              location, 
              picturePath,
              userPicturePath,
              likes,
              comments}
             


        )=>  ( 
                 <PostWidget
                Key = {_id}
                postUserId={userId}
                postId={_id}
                name={`${firstName} ${lastName}`}
                description={description}
                location={location}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                comments={comments} 
                
                   />  ) 
            
        )}
        
        </>
    )
}


export default PostsWidget