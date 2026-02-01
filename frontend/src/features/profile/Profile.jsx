import { useAuth } from '../../context/AuthContext'

export default function Profile() {
	const { user } = useAuth()

	return (
		<div>
			<h4>profile</h4>

			<div className="flex flex-col">
				<img
					src={user?.avatar}
					alt="Profile User Avatar"
				/>
				<span>{user?.name}</span>
				<span>{user?.email}</span>
			</div>
		</div>
	)
}
