import prisma from '../../prisma.js'

export async function getCategoriesStats(req, res) {
	try {
		const userId = req.user.id

		const data = await prisma.transaction.groupBy({
			by: ['category'],
			where: {
				userId,
				type: 'EXPENSE'
			},
			_sum: { amount: true }
		})

		res.status(200).json(
			data.map(item => ({
				category: item.category,
				total: item._sum.amount
			}))
		)
	} catch (error) {
		console.error('Error in getCategoriesStats controller', error.message)
		res.status(500).json({ message: 'Server error' })
	}
}
