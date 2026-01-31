import express from 'express'
import * as transaction from '../controllers/transactions/transactions.controller.js'
import { protectRoute } from '../middleware/protectRoute.js'

const router = express.Router()

router.get('/', protectRoute, transaction.transactionGetAll)
router.get('/summary', protectRoute, transaction.transactionSummary)
router.post('/', protectRoute, transaction.transactionCreate)
router.post('/transfer', protectRoute, transaction.transactionTransfer)
router.patch('/:id/cancel', protectRoute, transaction.transactionCanceled)

export default router
