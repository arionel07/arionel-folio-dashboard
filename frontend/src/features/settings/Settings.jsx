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
		<div>
			<h4>Settings</h4>

			<div>
				<span>{user?.name}</span>
			</div>

			<button onClick={logout}>Logout</button>
		</div>
	)
}
