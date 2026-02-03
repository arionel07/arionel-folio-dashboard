import api from './api'

export const getSummary = async () => {
	const res = await api.get('analytics/summary')
	console.log(res)
	console.log(res.data)
	return res.data
}

export const getUserBalance = async () => {
	const res = await api.get('/user/balance')
	console.log(res)
	console.log(res.data)
	return res.data
}
