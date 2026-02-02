export const formatDate = dateString => {
	const date = new Date(dateString)

	const day = date.getDate()
	const year = date.getFullYear().toString().slice(-2)

	const month = date.toLocaleString('en-US', {
		month: 'short'
	})

	const getSuffix = day => {
		if (day >= 11 && day <= 13) return 'th'

		switch (day % 10) {
			case 1:
				return 'st'
			case 2:
				return 'nd'
			case 3:
				return 'rd'
			default:
				return 'th'
		}
	}

	return `${month} ${day}${getSuffix(day)}, ${year}`
}
