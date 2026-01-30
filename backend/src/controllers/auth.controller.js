import bcrypt from 'bcryptjs'
import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js'
import prisma from '../prisma.js'

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

export async function logout(req, res) {
	try {
		res.cookie('jwt', '', { maxAge: 0 })
		res.status(200).json({ message: 'logged out was successfully' })
	} catch (error) {
		console.log('error in login controller', error.message)
		return res.status(500).json({ error: 'Internal server error' })
	}
}

export async function getMe(req, res) {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: req.user.id
			},
			select: {
				id: true,
				email: true,
				name: true
			}
		})
		res.status(200).json(user)
	} catch (error) {
		console.log('error in getMe controller', error.message)
		return res.status(500).json({ error: 'Internal server error' })
	}
}
