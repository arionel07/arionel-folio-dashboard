import { Summary } from '../../components/summary/summary'
import { Navbar } from '../../components/uibar/Navbar'
import Transactions from '../../features/transactions/Transactions'

export function DashboardsHome() {
	return (
		<div>
			<Navbar />
			<div className="space-y-8">
				{/* Summary Cards */}
				<Summary />

				{/* Recent Transactions */}
				<div className="bg-white dark:bg-[#282828] rounded-xl shadow p-6">
					<h3 className="font-semibold text-lg mb-4">Recent Transactions</h3>
					<Transactions />
				</div>
			</div>
		</div>
	)
}
