import prisma from '../prisma.js'

export async function getAllTransactions(req, res) {
	try {
		const transactions = await prisma.transaction.findMany({
			orderBy: { createdAt: 'desc' }
		})
		res.json(transactions)
	} catch (error) {
		res.status(500).json({ message: 'Failed to get Transactions' })
	}
}
export async function createTransaction(req, res) {
	try {
		const { title, amount, status, category } = req.body

		if (!title || !amount || !status || !category) {
			return res.status(400).json({ message: 'All fields are required' })
		}

		const transaction = await prisma.transaction.create({
			data: {
				title,
				amount,
				status,
				category
			}
		})

		res.status(201).json(transaction)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Failed to get Transactions' })
	}
}
