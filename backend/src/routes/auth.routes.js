import express from 'express'
import {
	getMe,
	login,
	logout,
	register
} from '../controllers/auth.controller.js'

const route = express.Router()

route.get('/me', getMe)
route.post('/register', register)
route.post('/login', login)
route.post('/logout', logout)

export default route
