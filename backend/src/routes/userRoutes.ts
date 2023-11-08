import Router from 'express'
import { checkUserDetails, getAllUsers, loginUser, registerUser } from '../controllers/userControllers'
import { verifyToken } from '../middleware/tokenVerify'

const user_router = Router()

user_router.post("/register", registerUser);
user_router.get('/',verifyToken,getAllUsers)
user_router.post('/login',loginUser)
user_router.get('/check_user_details',verifyToken,checkUserDetails)

export default user_router