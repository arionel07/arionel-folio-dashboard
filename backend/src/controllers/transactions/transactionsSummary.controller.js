import prisma from '../../prisma.js'

export async function getSummary(req, res) {
	try {
		const userId = req.user.id

		const transactions = await prisma.transaction.findMany({
			where: {
				userId,
				status: 'COMPLETED'
			},
			select: {
				amount: true,
				type: true,
				category: true,
				createdAt: true
			}
		})

		let totalIncome = 0
		let totalExpense = 0

		const monthlyMap = {}
		const categoryMap = {}

		for (const tx of transactions) {
			//totals
			if (tx.type === 'INCOME') totalIncome += tx.amount
			if (tx.type === 'EXPENSE') totalExpense += tx.amount
			//monthly
			const month = tx.createdAt.toISOString().slice(0, 7)
			if (!monthlyMap[month]) {
				monthlyMap[month] = { month, income: 0, expense: 0 }
			}
			if (tx.type === 'INCOME') monthlyMap[month].income += tx.amount
			if (tx.type === 'EXPENSE') monthlyMap[month].expense += tx.amount
			//categories
			if (!categoryMap[tx.category]) {
				categoryMap[tx.category] ??= { income: 0, expense: 0 }
			}
			if (tx.type === 'INCOME') categoryMap[tx.category].income += tx.amount
			if (tx.type === 'EXPENSE') categoryMap[tx.category].expense += tx.amount
		}

		res.status(200).json({
			totalIncome,
			totalExpense,
			monthly: Object.values(monthlyMap).sort((a, b) => {
				a.month.localeCompare(b.month)
			}),
			byCategory: Object.entries(categoryMap).map(([category, total]) => ({
				category,
				total
			}))
		})
	} catch (error) {
		console.error('Summary error:', error.message)
		res.status(500).json({ message: 'Failed to get summary' })
	}
}
