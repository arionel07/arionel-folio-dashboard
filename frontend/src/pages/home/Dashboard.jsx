import { Outlet } from 'react-router-dom'
import { Navbar } from '../../components/uibar/Navbar'
import { Sidebar } from '../../components/uibar/SideBar'

export default function Dashboard() {
	return (
		<div className="flex min-h-screen bg-gray-100 dark:bg-[#161616]">
			<Sidebar />
			<div className="flex flex-1 flex-col">
				<Navbar />
				<main className="p-6">
					<Outlet />
				</main>
			</div>
		</div>
	)
}
