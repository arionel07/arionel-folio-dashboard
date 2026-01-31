import prisma from '../../prisma.js'

export async function getBalance(req, res) {
	try {
		const balance = await prisma.user.findUnique({
			where: { id: req.user.id },
			select: {
				balance: true
			}
		})

		res.status(200).json(balance)
	} catch (error) {
		console.log('error in getBalance controller', error.message)
		return res.status(500).json({ error: 'Internal server error' })
	}
}
