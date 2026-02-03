import { memo } from 'react'

function Card({ title, value, color }) {
	return (
		<div className="bg-white dark:bg-[#282828] rounded-xl shadow p-6">
			<p className="text-sm text-gray-500 dark:text-gray-300">{title}</p>
			<p className={`text-2xl font-bold ${color}`}>{value}</p>
		</div>
	)
}

export default memo(Card)
