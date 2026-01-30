import express from 'express'
import transactionRoute from './routes/transactions.routes.js'

const app = express()

app.use(express.json())

app.use('/api/transactions', transactionRoute)

export default app
