import bcrypt from 'bcryptjs'
import { generateTokenAndSetCookie } from '../../lib/utils/generateToken.js'
import prisma from '../../prisma.js'

export async function login(req, res) {
	try {
		const { email, password } = req.body

		if (!email || !password) {
			return res.status(400).json({ message: 'Email and password required' })
		}

		const user = await prisma.user.findUnique({ where: { email } })
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid password' })
		}

		generateTokenAndSetCookie(user.id, res)

		res.status(200).json({
			id: user.id,
			email: user.email,
			name: user.name
		})
	} catch (error) {
		console.error('error in login controller', error.message)
		res.status(500).json({ message: 'Server Error' })
	}
}
