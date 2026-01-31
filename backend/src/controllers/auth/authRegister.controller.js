import bcrypt from 'bcryptjs'
import { generateTokenAndSetCookie } from '../../lib/utils/generateToken.js'
import prisma from '../../prisma.js'

export async function register(req, res) {
	try {
		const { email, password, name } = req.body

		if (!email || !password || !name) {
			return res.status(400).json({ message: 'All field are required' })
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(email)) {
			return res.status(400).json({ message: 'Invalid email format' })
		}

		const existingEmail = await prisma.user.findUnique({ where: { email } })
		if (existingEmail) {
			return res.status(400).json({ error: 'Email is Already Taken' })
		}

		if (password.length < 6) {
			return res
				.status(400)
				.json({ message: 'Password must be at least 6 character' })
		}

		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt)

		const user = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				name
			}
		})

		generateTokenAndSetCookie(user.id, res)

		res.status(201).json({
			id: user.id,
			email: user.email,
			name: user.name
		})
	} catch (error) {
		if (error.code === 'P2002') {
			return res.status(400).json({ message: 'User Already Exist' })
		}
		console.error('error in register controller', error.message)
		res.status(500).json({ message: 'Server Error' })
	}
}
