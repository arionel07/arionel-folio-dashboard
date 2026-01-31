//import { sendTransactionalEmail } from '../../lib/email/email.js'
import prisma from '../../prisma.js'

export async function createTransaction(req, res) {
	try {
		const { title, amount, status, category, type, balance } = req.body
		const userId = req.user.id

		if (!title || !amount || !status || !category) {
			return res.status(400).json({ message: 'All fields are required' })
		}
		if (amount <= 0) {
			return res.status(400).json({ message: 'Amount must be greater than 0' })
		}
		if (!['INCOME', 'EXPENSE'].includes(type)) {
			return res.status(400).json({ message: 'Invalid transaction type' })
		}

		const user = await prisma.user.findUnique({
			where: { id: userId }
		})

		if (type === 'EXPENSE' && user.balance < amount) {
			return res.status(400).json({ message: 'Insufficient balance' })
		}

		const transaction = await prisma.$transaction(async tx => {
			await tx.user.update({
				where: { id: userId },
				data:
					type === 'INCOME'
						? { balance: { increment: amount } }
						: { balance: { decrement: amount } }
			})

			const t = await tx.transaction.create({
				data: {
					title,
					amount,
					status,
					type,
					category,
					balance,
					userId: req.user.id
				}
			})
			return t
		})

		if (req.user.notifyByEmail) {
			//await sendTransactionalEmail(req.user.email, transaction)
		}

		res.status(201).json(transaction)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Failed to get Transactions' })
	}
}
