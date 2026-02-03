import api from './api'

export const getMonthGoals = async month => {
	const res = await api.get(`analytics/goal?month=${month}`)
	return res.data
}

export const createMonthGoal = async data => {
	const res = await api.post('analytics/goal', data)
	return res.data
}

export const logout = async () => {
	await api.post('/auth/logout')
}
