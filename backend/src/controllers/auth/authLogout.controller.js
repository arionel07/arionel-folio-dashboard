export async function logout(req, res) {
	try {
		res.cookie('jwt', '', { maxAge: 0 })
		res.status(200).json({ message: 'logged out was successfully' })
	} catch (error) {
		console.log('error in login controller', error.message)
		return res.status(500).json({ error: 'Internal server error' })
	}
}
