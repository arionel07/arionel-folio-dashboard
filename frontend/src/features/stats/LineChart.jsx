import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts'
import { getMonthlyStats } from '../../api/stats.api'

function LineLiChart() {
	const { data, isLoading } = useQuery({
		queryKey: ['monthlyStats'],
		queryFn: getMonthlyStats
	})

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<ResponsiveContainer
			width="100%"
			height={320}
		>
			<BarChart
				data={data}
				margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
			>
				<CartesianGrid
					strokeDasharray="3 3"
					stroke="#e5e7eb"
					className="dark:stroke-gray-700"
				/>
				<XAxis
					dataKey="day"
					tickLine={false}
					axisLine={false}
					className="text-xs"
				/>
				<YAxis
					tickLine={false}
					axisLine={false}
					className="text-xs"
				/>
				<Tooltip
					cursor={{ fill: 'rgba(0,0,0,0.05)' }}
					contentStyle={{
						backgroundColor: '#111',
						borderRadius: 8,
						border: 'none',
						color: '#fff'
					}}
				/>
				<Bar
					dataKey="income"
					fill="#16a34a"
					radius={[6, 6, 0, 0]}
					animationDuration={1200}
				/>
				<Bar
					dataKey="expense"
					fill="#dc2626"
					radius={[6, 6, 0, 0]}
					animationDuration={1200}
				/>
			</BarChart>
		</ResponsiveContainer>
	)
}
export default memo(LineLiChart)
