import { useQuery } from '@tanstack/react-query'
import { memo, useState } from 'react'
import { GoArrowUpLeft } from 'react-icons/go'
import { getTransactions } from '../../api/transactions.api.js'
import { formatDate } from '../../utils/formatDate.js'
import {
	formatAmount,
	getCategoryColor,
	getStatusColor,
	getTypeColor
} from '../../utils/formatters.js'
import { truncateText } from '../../utils/truncate.js'
import { TransactionsFilters } from './TransactionsFilters'

function Transactions() {
	const [page, setPage] = useState(1)
	const [filters, setFilters] = useState({
		status: '',
		category: ''
	})

	const { data = { items: [], meta: {} }, isFetching } = useQuery({
		queryKey: ['transactions', page, filters],
		queryFn: () =>
			getTransactions({
				page,
				limit: 3,
				...filters
			}),
		initialData: {
			items: [],
			meta: {}
		},
		keepPreviousData: true
	})

	if (!data) {
		return <div>No data</div>
	}

	return (
		<div className="mt-10">
			<div className="flex items-center justify-between mb-5">
				<h2 className="text-3xl font-bold mb-4">Transactions</h2>

				<TransactionsFilters
					filters={filters}
					setFilters={setFilters}
				/>
			</div>
			<div>
				<div className="w-full flex flex-col gap-2">
					{isFetching ? (
						<div className="text-sm text-gray-400 mt-2">Loading...</div>
					) : (
						data.items.map(tx => (
							<div
								key={tx.id}
								className="flex items-center justify-between w-full dark:bg-[#282828] bg-white p-3 rounded-lg shadow dark:hover:bg-gray-800 hover:bg-gray-50 transition"
							>
								<div className="flex items-center">
									<div className="p-3 justify-start bg-pink-300 rounded-2xl ">
										<GoArrowUpLeft
											className="mx-auto my-0"
											size={18}
										/>
									</div>
									<div className="pl-3 font-bold text-[14px]">
										{truncateText(tx.title, 15)}
									</div>
								</div>
								<div className="pl-5">{formatDate(tx.createdAt)}</div>
								<div className="p-3">
									<span
										className={`py-2 px-4  rounded-full text-sm font-medium ${getTypeColor(tx.type)}`}
									>
										{tx.type}
									</span>
								</div>
								<div className="p-3 ">
									<span
										className={`py-2 px-4  rounded-full text-sm font-medium ${getCategoryColor(tx.category)}`}
									>
										{tx.category}
									</span>
								</div>
								<div className="p-3">
									<span
										className={`py-2 px-4 rounded-full text-sm font-medium ${getStatusColor(tx.status)}`}
									>
										{tx.status}
									</span>
								</div>
								<div className="p-3 font-semibold">
									{tx.type === 'INCOME' ? '+' : '-'}${formatAmount(tx.amount)}
								</div>
							</div>
						))
					)}
				</div>
			</div>

			{/*Pagination */}
			<div className="flex gap-2 mt-4">
				<button
					disabled={page === 1}
					onClick={() => setPage(p => p - 1)}
					className="cursor-pointer px-3 py-1 border rounded"
				>
					Prev
					{console.log('page:', page)}
				</button>

				<span className="px-3 py-1">Page {page}</span>
				{console.log('page:', page)}
				<button
					disabled={page >= data.meta.pages}
					onClick={() => setPage(p => p + 1)}
					className="cursor-pointer px-3 py-1 rounded border"
				>
					{console.log('page:', page)}
					Next
				</button>
			</div>
		</div>
	)
}

export default memo(Transactions)
