import prisma from '../../prisma.js'

export async function getAnalyticsSummary(req, res) {
	try {
		const userId = req.user.id

		const income = await prisma.transaction.aggregate({
			where: { userId, type: 'INCOME' },
			_sum: { amount: true }
		})
		const expense = await prisma.transaction.aggregate({
			where: { userId, type: 'EXPENSE' },
			_sum: { amount: true }
		})

		res.status(200).json({
			totalIncome: income._sum.amount || 0,
			totalExpense: expense._sum.amount || 0
		})
	} catch (error) {
		console.error('Error in getAnalyticsSummary controller', error.message)
		res.status(500).json({ message: 'Server error' })
	}
}
