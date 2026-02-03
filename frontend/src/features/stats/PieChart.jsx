import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip
} from 'recharts'
import { getCategoriesStats } from '../../api/stats.api'

const COLORS = ['#16a34a', '#dc2626', '#facc15', '#2563eb', '#a21caf']

function PiePiChart() {
	const { data, isLoading } = useQuery({
		queryKey: ['categoryStat'],
		queryFn: getCategoriesStats
	})

	if (isLoading) {
		return <div>Loading...</div>
	}
	return (
		<ResponsiveContainer>
			<PieChart>
				<Pie
					data={data}
					dataKey={'total'}
					nameKey={'category'}
					cx={'50%'}
					cy={'50%'}
					outerRadius={100}
					fill="#8884d8"
					label
				>
					{data.map((entry, index) => (
						<Cell
							key={`cell-${index}`}
							fill={COLORS[index % COLORS.length]}
						/>
					))}
				</Pie>
				<Tooltip />
				<Legend />
			</PieChart>
		</ResponsiveContainer>
	)
}

export default memo(PiePiChart)
