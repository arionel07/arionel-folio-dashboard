import prisma from '../../prisma.js'

export async function getMonthProgress(req, res) {
	try {
		const userId = req.user.id
		const { month } = req.query

		const goal = await prisma.monthlyGoal.findUnique({
			where: { userId_month: { userId, month } }
		})

		const expense = await prisma.transaction.aggregate({
			where: {
				userId,
				type: 'EXPENSE',
				status: 'COMPLETED',
				createdAt: {
					gte: new Date(`${month}-01`)
				}
			},
			_sum: { amount: true }
		})

		res.status(200).json({
			limit: goal?.limit || 0,
			spent: expense._sum.amount || 0,
			remaining: (goal?.limit || 0) - (expense._sum.amount || 0)
		})
	} catch (error) {
		console.log('error in getMonthProgress controller', error.message)
		return res.status(500).json({ error: 'Internal server error' })
	}
}
