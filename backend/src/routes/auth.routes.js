import express from 'express'
import * as auth from '../controllers/auth/auth.controller.js'
import { protectRoute } from '../middleware/protectRoute.js'

const route = express.Router()

route.get('/me', protectRoute, auth.authGetMe)
route.post('/register', auth.authRegister)
route.post('/login', auth.authLogin)
route.post('/logout', auth.authLogout)

export default route
