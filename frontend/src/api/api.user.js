import api from './api'

export const getSummary = async data => {
	const res = await api.get('/analytics/summary', data)

	return res.data
}

export const getUserBalance = async () => {
	const res = await api.get('/user/balance')

	return res.data
}
