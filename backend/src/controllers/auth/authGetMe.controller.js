import prisma from '../../prisma.js'
export async function getMe(req, res) {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: req.user.id
			},
			select: {
				id: true,
				email: true,
				name: true,
				avatar: true
			}
		})
		res.status(200).json(user)
	} catch (error) {
		console.log('error in getMe controller', error.message)
		return res.status(500).json({ error: 'Internal server error' })
	}
}
