import { useNavigate } from 'react-router-dom'
import api from '../../api/api.js'
import { useAuth } from '../../context/AuthContext'

export default function Settings() {
	const { user } = useAuth()

	const navigate = useNavigate()

	const logout = async () => {
		await api.post('/auth/logout')
		navigate('/login')
	}

	return (
		<div className="">
			<h4 className="">Settings</h4>

			<div className="">
				<span>{user?.name}</span>
			</div>
			<div className="">
				<button>{}</button>
			</div>

			<button onClick={logout}>Logout</button>
		</div>
	)
}
