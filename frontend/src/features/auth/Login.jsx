import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../api/auth.api.js'

export default function Login() {
	const navigate = useNavigate()
	const [serverError, setServerError] = useState(null)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()

	const { mutate, isLoading } = useMutation({
		mutationFn: loginUser,
		onSuccess: () => navigate('/dashboard'),
		onError: err => {
			setServerError(err.response?.data?.message || 'Login failed')
		}
	})

	const onSubmit = data => {
		setServerError(null)
		mutate(data)
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#161616]">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="bg-white dark:bg-[#282828] rounded-xl shadow-md p-8 w-full max-w-2xl"
			>
				<h3 className="text-2xl font-bold mb-6 text-center">Login</h3>

				{/* Email */}

				<div className="mb-4">
					<input
						type="email"
						placeholder="Email"
						className="w-full border p-3 outline-none rounded-lg"
						{...register('email', { required: 'Email is required' })}
					/>
					{errors.email && (
						<p className="mt-1 text-red-500/80 text-sm">
							{errors.email.message}
						</p>
					)}
				</div>
				{/* Password */}

				<div className="mb-4">
					<input
						type="password"
						placeholder="Password"
						className="w-full border p-3 outline-none rounded-lg"
						{...register('password', { required: 'Password is required' })}
					/>
					{errors.password && (
						<p className="mt-1 text-red-500/80 text-sm">
							{errors.password.message}
						</p>
					)}
				</div>

				{serverError && (
					<p className="mt-3 text-lg text-red-600 text-center">{serverError}</p>
				)}
				<button
					type="submit"
					disabled={isLoading}
					className="w-full bg-black text-teal-50 rounded-lg p-3 transition-all hover:bg-teal-100/90 hover:text-black duration-[0.5s] cursor-pointer"
				>
					{isLoading ? 'Logging in...' : 'Login'}
				</button>

				<p className="text-center text-sm mt-4">
					No account yet?{' '}
					<Link
						className="font-semibold underline"
						to={'/register'}
					>
						Register
					</Link>{' '}
				</p>
			</form>
		</div>
	)
}
