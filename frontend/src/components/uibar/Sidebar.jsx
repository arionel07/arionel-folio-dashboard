import { CiSquarePlus } from 'react-icons/ci'
import { FiHome, FiSettings, FiUser } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import avatarPreview from '../../../public/avatar.png'
import { useAuth } from '../../context/AuthContext'

const linkClass =
	'flex items-center gap-3 py-10 rounded-lg hover:text-gray-600 transition duration-100'

export function Sidebar() {
	const { user } = useAuth()
	return (
		<aside className="w-30 dark:bg-[#282828] text-teal-50 bg-[#161616] shadow-md">
			<nav className="flex flex-col items-center justify-between px-2 gap-1">
				<div className="relative mt-12">
					<NavLink
						to={'/dashboard'}
						end
						className=""
					>
						<div className="w-[64px] h-[64px]">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-full h-auto"
								viewBox="0 0 100 100"
							>
								<path
									d="M 20 70 Q 20 80 30 80 L 49 80 L 49 30 Q 49 20 39 20 L 20 20 Z"
									fill="#b39ddb"
								/>

								<path
									d="M 80 70 Q 80 80 70 80 L 51 80 L 51 30 Q 51 20 61 20 L 80 20 Z"
									fill="#b39ddb"
								/>
							</svg>
						</div>
					</NavLink>
				</div>

				<div className="mt-24">
					<NavLink
						to="/dashboard"
						className={linkClass}
					>
						<FiHome size={35} />
					</NavLink>
					<NavLink
						to="/dashboard/create"
						className={linkClass}
					>
						<CiSquarePlus size={35} />
					</NavLink>
					<NavLink
						to="/dashboard/profile"
						className={linkClass}
					>
						<FiUser size={35} />
					</NavLink>

					<NavLink
						to="/dashboard/settings"
						className={linkClass}
					>
						<FiSettings size={35} />
					</NavLink>
				</div>

				<div className="absolute bottom-20 w-[45px] h-[45px]">
					<img
						className="w-full h-full rounded-[100%] "
						src={user?.avatar || avatarPreview}
						alt="user profile avatar image"
					/>
				</div>
			</nav>
		</aside>
	)
}
