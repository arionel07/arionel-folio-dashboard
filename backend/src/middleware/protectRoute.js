import jwt from 'jsonwebtoken'
import prisma from '../prisma.js'

export const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies?.jwt

		if (!token) {
			return res.status(401).json({ message: 'Unauthorized - no token' })
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		const user = await prisma.user.findUnique({
			where: { id: decoded.userId },
			select: { id: true, email: true, name: true }
		})

		if (!user) {
			return res.status(401).json({ message: 'Unauthorized - user not found' })
		}

		req.user = user
		next()
	} catch (error) {
		console.error('Error in protectRoute middleware:', error.message)
		return res.status(401).json({ message: 'Unauthorized' })
	}
}
