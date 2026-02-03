import api from './api'

export const getMonthlyStats = async data => {
	const res = await api.get('/analytics/monthly', data)
	return res.data
}

export const getCategoriesStats = async data => {
	const res = await api.get('/analytics/categories', data)
	return res.data
}
