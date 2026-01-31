import prisma from '../../prisma.js'

export async function setMonthGoal(req, res) {
	try {
		const { month, limit } = req.body
		const userId = req.user.id

		const goal = await prisma.monthlyGoal.upsert({
			where: {
				userId_month: { userId, month }
			},
			update: { limit },
			create: {
				userId,
				month,
				limit
			}
		})

		res.status(201).json(goal)
	} catch (error) {
		console.log('error in setMonthGoal controller', error.message)
		return res.status(500).json({ error: 'Internal server error' })
	}
}
