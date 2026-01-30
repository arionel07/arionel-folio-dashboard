import cookieParser from 'cookie-parser'
import express from 'express'
import authRoute from './routes/auth.routes.js'
import transactionRoute from './routes/transactions.routes.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/transactions', transactionRoute)
app.use('/api/auth', authRoute)

export default app
