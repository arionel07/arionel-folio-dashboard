import { useQuery } from '@tanstack/react-query'
import { getMonthlyStats } from '../../api/stats.api'
import LineLiChart from '../../features/stats/LineChart'
import PiePiChart from '../../features/stats/PieChart'
import { userBalance, userSummary } from '../../features/user/userBalance'
import Card from '../card/Card'

export function Summary() {
	const { month } = useQuery({
		queryKey: ['monthlyStats'],
		queryFn: getMonthlyStats
	})
	console.log(month)
	const { data, isLoading } = userBalance()
	const { datas } = userSummary()
	const balance = data?.balance ?? 0
	const totalExpense = datas?.totalExpense ?? 0
	const totalIncome = datas?.totalIncome ?? 0
	if (isLoading) {
		;<div>Loading...</div>
	}

	return (
		<div className="">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				<Card
					title="Total Earnings (Monthly)"
					value={totalIncome + '$'}
					color="text-blue-500"
				/>
				<Card
					title="Total Spending (Monthly)"
					value={totalExpense + '$'}
					color="text-red-500"
				/>
				<Card
					title="Balance"
					value={balance + '$'}
					color="text-amber-500"
				/>
			</div>

			{/* Charts */}
			<div className="grid grid-cols-2 lg:grid-cols-[2fr, 1fr] gap-6 mt-15">
				<div className="bg-white dark:bg-[#282828] rounded-xl shadow p-6">
					<h3 className="font-semibold text-lg mb-4">Monthly Trend</h3>
					<LineLiChart month="2026-02" />
				</div>
				<div className="bg-white dark:bg-[#282828] rounded-xl shadow p-6">
					<h3 className="font-semibold text-lg mb-4">Category Breakdown</h3>
					<PiePiChart month="2026-02" />
				</div>
			</div>
		</div>
	)
}
