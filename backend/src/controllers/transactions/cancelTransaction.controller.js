import prisma from '../../prisma.js'

export async function cancelTransaction(req, res) {
	try {
		const { id } = req.params
		const userId = req.user.id

		const tx = await prisma.transaction.findUnique({
			where: { id: Number(id) }
		})

		if (tx.status !== 'COMPLETED') {
			return res.status(400).json({ message: 'Cannot cancel this transaction' })
		}

		await prisma.$transaction(async db => {
			await db.transaction.update({
				where: { id: tx.id },
				data: {
					status: 'CANCELED'
				}
			})
			await db.user.update({
				where: { id: userId },
				data:
					tx.type === 'INCOME'
						? { balance: { decrement: tx.amount } }
						: { balance: { increment: tx.amount } }
			})
		})

		res.status(200).json('Transaction Canceled')
	} catch (error) {
		console.error('cancelTransaction error', error)
		res.status(500).json({ message: 'Server error' })
	}
}
