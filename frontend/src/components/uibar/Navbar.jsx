import { CiCalendar, CiSearch } from 'react-icons/ci'
import { IoIosNotificationsOutline } from 'react-icons/io'

export function Navbar() {
	return (
		<header className="px-6 py-12 flex justify-between items-center">
			<h1 className="text-5xl font-semibold">Track your finance</h1>

			<div className=" flex items-center">
				<div className="mr-12 flex items-center p-2 dark:bg-[#282828] bg-gray-300 rounded-lg">
					<CiSearch size={18} />
					<input
						type="text"
						placeholder="Search"
						className=" text-lg outline-none ml-3"
					/>
				</div>
				<div className="flex">
					<button className="p-3 bg-gray-200 dark:bg-[#282828] rounded-lg mr-4 cursor-pointer">
						<IoIosNotificationsOutline size={22} />
					</button>
					<button className="p-3 bg-gray-200 dark:bg-[#282828] rounded-lg cursor-pointer">
						<CiCalendar size={22} />
					</button>
				</div>
			</div>
		</header>
	)
}
