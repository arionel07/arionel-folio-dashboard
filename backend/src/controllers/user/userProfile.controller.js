import prisma from '../../prisma.js'

export async function updateUserProfile(req, res) {
	try {
		const userId = req.user.id
		const { name, avatar } = req.body

		const updateUser = await prisma.user.update({
			where: { id: userId },
			data: {
				name: name || undefined,
				avatar: avatar || undefined
			},
			select: {
				id: true,
				name: true,
				email: true,
				avatar: true
			}
		})

		res.status(200).json(updateUser)
	} catch (error) {
		console.log('error in updateUserProfile controller', error.message)
		return res.status(500).json({ error: 'Internal server error' })
	}
}
