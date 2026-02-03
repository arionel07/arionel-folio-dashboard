import api from './api'

export const patchUserProfile = async data => {
	const res = await api.patch('/user/profile', data)
	console.log(res)
	console.log(res.data)
	return res.data
}
