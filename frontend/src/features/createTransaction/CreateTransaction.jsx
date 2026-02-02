import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { createNewTransaction } from '../../api/transactions.api'
import { userBalance } from '../user/userBalance.js'
import CreateTransactionResult from './CreateTransactionResult.jsx'

export function CreateTransaction() {
	const navigate = useNavigate()
	const [result, setResult] = useState(null)

	const { data } = userBalance()
	const balance = data?.balance ?? 0

	const { register, handleSubmit } = useForm({
		defaultValues: {
			type: 'EXPENSE',
			status: 'COMPLETED'
		}
	})

	const { mutate, isLoading } = useMutation({
		mutationFn: createNewTransaction,
		onSuccess: () => {
			setResult({
				type: 'success',
				message: 'Transaction was successfully created'
			})
		},
		onError: err => {
			const msg =
				typeof err.response?.data?.message === 'string'
					? err.response?.data?.message
					: 'Something went wrong'
			setResult({
				type: 'error',
				message: msg
			})
		}
	})

	const onSubmit = data => {
		mutate({
			...data,
			amount: Number(data.amount)
		})
	}

	const handleClose = () => {
		setResult(null)
		if (result?.type === 'success') {
			navigate('/dashboard')
		}
	}

	const classInput = 'w-full rounded p-3 border mb-4 outline-none'
	return (
		<div className="flex items-center justify-center">
			<div className="bg-white dark:bg-[#282828] p-6 rounded-xl w-full max-w-md">
				<div className="flex items-center justify-between mb-8">
					<h4 className="text-2xl font-bold ">New Transaction</h4>
					<p
						className={`font-semibold text-md ${balance < 0 ? 'text-red-400' : 'dark:text-white text-black'}`}
					>
						{balance}
					</p>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="spae-y-3"
				>
					<input
						type="text"
						className={classInput}
						placeholder="Title"
						{...register('title', { required: true })}
					/>
					<input
						type="number"
						step={0.01}
						placeholder="Amount"
						className={classInput}
						{...register('amount', { required: true })}
					/>

					<select
						className={classInput}
						{...register('type')}
					>
						<option value="EXPENSE">Expense</option>
						<option value="Income">Income</option>
					</select>

					<select
						className={classInput}
						{...register('category')}
					>
						<option value="OTHER">Other</option>
						<option value="FOOD">Food</option>
						<option value="SALARY">Salary</option>
						<option value="HEALTH">health</option>
						<option value="TRAVEL">Travel</option>
					</select>

					<select
						className={classInput}
						{...register('status')}
					>
						<option value="COMPLETED">Completed</option>
						<option value="PENDING">Pending</option>
						<option value="CANCELED">Canceled</option>
					</select>

					<div className="flex gap-2 p-4">
						<button
							className="flex-1 bg-[#181818] dark:bg-amber-50 hover:opacity-70 transition-all duration-300 cursor-pointer text-white dark:text-black p-3 rounded"
							disabled={isLoading}
							type="submit"
						>
							{isLoading ? 'Creating...' : 'Create'}
						</button>
					</div>
				</form>

				{result && (
					<CreateTransactionResult
						type={result.type}
						message={result.message}
						onClose={handleClose}
					/>
				)}
			</div>
		</div>
	)
}
