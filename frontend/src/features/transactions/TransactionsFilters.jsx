export function TransactionsFilters({ filters, setFilters }) {
	return (
		<div className="flex gap-4 mb-4">
			<select
				className="border p-2 rounded cursor-pointer"
				value={filters.status}
				onChange={e =>
					setFilters(prev => ({ ...prev, status: e.target.value }))
				}
			>
				<option value="">All Statues</option>
				<option value="COMPLETED">Completed</option>
				<option value="PENDING">Pending</option>
				<option value="CANCELED">Canceled</option>
			</select>

			<select
				className="border p-2 rounded cursor-pointer"
				value={filters.category}
				onChange={e =>
					setFilters(prev => ({ ...prev, category: e.target.value }))
				}
			>
				<option value="">All categories</option>
				<option value="Food">Food</option>
				<option value="Salary">Salary</option>
				<option value="Travel">Travel</option>
			</select>
		</div>
	)
}
