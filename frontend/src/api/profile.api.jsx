import api from './api'

export const patchUserProfile = async data => {
	const res = await api.patch('/user/profile', data)
	return res.data
}
