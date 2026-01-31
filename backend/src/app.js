import cookieParser from 'cookie-parser'
import express from 'express'
import { protectRoute } from './middleware/protectRoute.js'
import analyticRoute from './routes/analytics.routes.js'
import authRoute from './routes/auth.routes.js'
import transactionRoute from './routes/transactions.routes.js'
import userRoute from './routes/user.routes.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/analytics', protectRoute, analyticRoute)
app.use('/api/user', protectRoute, userRoute)
app.use('/api/transactions', protectRoute, transactionRoute)
app.use('/api/auth', authRoute)

export default app
