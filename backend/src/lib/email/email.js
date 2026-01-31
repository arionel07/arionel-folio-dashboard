import 'dotenv/config'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: process.env.SMTP_PORT,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS
	}
})

export const sendTransactionalEmail = async (to, transaction) => {
	const { title, amount, status, category, createdAt } = transaction

	const mailOptions = {
		from: `Folio Dashboard ${process.env.SMTP_USER}`,
		to,
		subject: `New Transaction: ${title}`,
		text: `
		Hello!

		You have a new transaction:

		Title: ${title}
		Amount: ${amount}
		Status: ${status}
		Category: ${category}
		Date: ${new Date(createdAt).toLocaleString()}

		-Folio Dashboard
		`
	}

	try {
		const info = await transporter.sendMail(mailOptions)
		console.log('Email sent: ', info.messageId)
	} catch (error) {
		console.error('Failed to send email:', error.message)
	}
}
