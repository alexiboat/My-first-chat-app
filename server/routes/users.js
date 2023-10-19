import  express  from "express";
import {getUser, getUserFriends, addRemoveFriends} from '../controllers/users.js'
import { verifyToken } from "../middleware/auth.js";

const router = express.Router()

 /** READ Route */
router.get('/:id', getUser)// user profile page
router.get('/:id/friends', getUserFriends)// at getFriends List  at Friends list widget

/**UPDATE  check this friendsId */

router.patch('/:id/:friendId', addRemoveFriends) // at friend component



export default  router 