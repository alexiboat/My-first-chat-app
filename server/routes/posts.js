import express from 'express'
import {getFeedPosts, getUserPosts, likePosts} from '../controllers/posts.js'
import { verifyToken } from '../middleware/auth.js'


const router = express.Router()


/** READ ROUTE */
router.get('/', getFeedPosts)// at postsWidget
router.get('/:userId/posts', getUserPosts)//at postWidget



 
/**UPDATE ROUTE */
router.patch('/:id/like', likePosts)// at postWidget



export default router  