import express from 'express'
import * as user from '../controllers/user/user.controller.js'
import { protectRoute } from '../middleware/protectRoute.js'

const route = express.Router()

route.get('/balance', protectRoute, user.userBalance)

export default route
