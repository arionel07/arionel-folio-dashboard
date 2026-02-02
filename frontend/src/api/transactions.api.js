import api from './api.js'

export const getTransactions = async params => {
	const res = await api.get('/transactions', { params })
	return {
		items: res.data.data,
		meta: res.data.meta
	}
}
