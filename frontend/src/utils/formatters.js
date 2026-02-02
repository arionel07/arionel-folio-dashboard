export const formatAmount = amount => {
	return amount.toLocaleString(undefined, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	})
}

export const getStatusColor = status => {
	switch (status) {
		case 'COMPLETED':
			return 'text-green-600 bg-green-100'
		case 'PENDING':
			return 'text-yellow-600 bg-yellow-100'
		case 'EXPENSE':
			return 'text-red-600 bg-red-100'
		default:
			return 'text-gray-600 bg-gray-200'
	}
}
export const getTypeColor = type => {
	switch (type) {
		case 'INCOME':
			return 'text-[#B5AFEA] bg-[#dbd7ff]'
		case 'EXPENSE':
			return 'text-[#FCB578] bg-[#ffe0c5]'
		default:
			return 'text-gray-600 bg-gray-200'
	}
}

export const getCategoryColor = category => {
	switch (category) {
		case 'Food':
			return 'bg-purple-100 text-purple-600'
		case 'Health':
			return 'bg-green-100 text-green-600'
		case 'Travel':
			return 'bg-red-100 text-red-600'
		case 'Salary':
			return 'bg-blue-100 text-blue-600'
		default:
			return 'bg-gray-300 text-gray-600'
	}
}
