import prisma from '../../prisma.js'

export async function getMonthlyStats(req, res) {
	try {
		const userId = req.user.id

		const transaction = await prisma.transaction.findMany({
			where: { userId },
			select: { amount: true, type: true, createdAt: true }
		})

		const stats = {}

		for (const tx of transaction) {
			const month = tx.createdAt.toISOString().slice(0, 7)

			if (!stats[month]) {
				stats[month] = { income: 0, expense: 0 }
			}

			if (type === 'EXPENSE') stats[month].expense += tx.amount
			if (type === 'INCOME') stats[month].income += tx.amount
		}

		const result = Object.entries(stats).map(([month, values]) => ({
			month,
			...values
		}))

		res.status(200).json(result)
	} catch (error) {
		console.error('Error in getMonthlyStats controller', error.message)
		res.status(500).json({ message: 'Server error' })
	}
}
