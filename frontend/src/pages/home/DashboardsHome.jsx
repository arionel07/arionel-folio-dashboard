import { Navbar } from '../../components/uibar/Navbar'
import { Transactions } from '../../features/transactions/Transactions'

export function DashboardsHome() {
	return (
		<div>
			<Navbar />
			<Transactions />
		</div>
	)
}
