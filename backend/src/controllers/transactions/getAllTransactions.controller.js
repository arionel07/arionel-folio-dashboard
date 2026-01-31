import prisma from '../../prisma.js'

export async function getAllTransactions(req, res) {
	try {
		const userId = req.user.id

		const { page = 1, limit = 10, type, category, status, from, to } = req.query

		const where = { userId }

		if (type) where.type = type
		if (category) where.category = category
		if (status) where.status = status

		if (from || to) {
			where.createdAt = {}
			if (from) where.createdAt.gte = new Date(from)
			if (to) where.createdAt.lte = new Date(to)
		}

		const transactions = await prisma.transaction.findMany({
			where,
			orderBy: { createdAt: 'desc' },
			skip: (page - 1) * limit,
			take: Number(limit)
		})

		const total = await prisma.transaction.count({ where })

		res.status(200).json({
			data: transactions,
			meta: {
				page: Number(page),
				limit: Number(limit),
				total,
				pages: Math.ceil(total / limit)
			}
		})
	} catch (error) {
		res.status(500).json({ message: 'Failed to get Transactions' })
	}
}
