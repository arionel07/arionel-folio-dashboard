//import { sendTransactionalEmail } from '../../lib/email/email.js'
import prisma from '../../prisma.js'

export async function transfer(req, res) {
	try {
		const fromUserId = req.user.id
		const { toUserId, amount } = req.body

		if (!toUserId || amount <= 0) {
			return res.status(400).json({ message: 'Invalid Data ' })
		}

		const sender = await prisma.user.findUnique({
			where: { id: fromUserId }
		})

		if (sender.balance < amount) {
			return res.status(400).json({ message: 'Insufficient balance' })
		}

		if (fromUserId === toUserId) {
			return res.status(400).json({ message: 'Cannot transfer to yourself!' })
		}

		const receiver = await prisma.user.findUnique({
			where: { id: toUserId }
		})

		if (!receiver) {
			return res.status(400).json({ message: 'Receiver not found' })
		}

		await prisma.$transaction(async tx => {
			await tx.user.update({
				where: { id: fromUserId },
				data: { balance: { decrement: amount } }
			})

			await tx.user.update({
				where: { id: toUserId },
				data: { balance: { increment: amount } }
			})

			await tx.transaction.create({
				data: {
					title: `transfer to ${receiver.email}`,
					amount,
					type: 'EXPENSE',
					category: 'Transfer',
					status: 'PENDING',
					userId: fromUserId
				}
			})
			await tx.transaction.create({
				data: {
					title: `transfer to ${sender.email}`,
					amount,
					type: 'INCOME',
					category: 'Transfer',
					status: 'COMPLETED',
					userId: toUserId
				}
			})
		})

		if (sender.notifyByEmail) {
			//await sendTransactionalEmail(sender.email, expense)
		}

		if (receiver.notifyByEmail) {
			//await sendTransactionalEmail(receiver.email, income)
		}

		res.status(201).json({
			message: 'Transfer successful'
		})
	} catch (error) {
		console.error('transfer error', error)
		res.status(500).json({ message: 'Server error' })
	}
}
