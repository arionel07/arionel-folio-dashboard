import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import {
	IoIosNotificationsOff,
	IoIosNotificationsOutline
} from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { createMonthGoal, logout } from '../../api/settings.api.js'
import { useAuth } from '../../context/AuthContext'
import { applyTheme } from '../../utils/theme.js'

export default function Settings() {
	const { user } = useAuth()
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
	const [checked, setChecked] = useState(false)

	const monthMutate = useMutation({
		mutationFn: createMonthGoal,
		onSuccess: () => {
			queryClient.invalidateQueries(['me'])
		}
	})
	const logoutMutate = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			queryClient.clear()
			navigate('/login')
		}
	})

	const toggleTheme = () => {
		const next = theme === 'dark' ? 'light' : 'dark'
		setTheme(next)
		applyTheme(next)
	}

	const handleChange = e => {
		setChecked(e.target.checked)
		monthMutate.mutate({ emailNotifications: e.target.checked })
	}

	return (
		<div className="w-[500px] mt-35 mx-auto">
			<div className="flex items-center justify-center flex-col bg-white p-6 dark:bg-[#282828] rounded-lg text-center">
				<h4 className="font-bold text-3xl mb-5">Settings</h4>

				<div className="mt-2">
					<span className="uppercase text-lg">{user?.name}</span>
				</div>

				<div className="flex justify-between items-center mt-5">
					<span className="underline font-bold mr-2 flex items-center transition-all duration-300">
						{checked ? (
							<IoIosNotificationsOff size={20} />
						) : (
							<IoIosNotificationsOutline size={20} />
						)}
						Email notifications
					</span>
					<input
						id="email-check"
						type="checkbox"
						className="cursor-pointer"
						onChange={handleChange}
					/>
				</div>

				<div className="my-3">
					<span className="font-bold underline mr-2">Monthly Goals</span>
					<input
						type="checkbox"
						className="cursor-pointer"
						onChange={e =>
							monthMutate.mutate({ monthlyGoalsEnabled: e.target.checked })
						}
					/>
				</div>
				<div className="flex mt-5">
					<button
						className="dark:bg-amber-50 dark:text-black text-teal-50 bg-black p-3 cursor-pointer rounded transition-all duration-300"
						onClick={toggleTheme}
					>
						{theme === 'dark' ? '☀️ light' : '🌚 dark'}
					</button>
					<button
						className="ml-5  text-teal-50 bg-red-500 p-3 cursor-pointer rounded transition-all duration-300"
						onClick={() => logoutMutate.mutate()}
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	)
}
