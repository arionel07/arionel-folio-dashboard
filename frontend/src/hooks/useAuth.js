import { useQuery } from '@tanstack/react-query'
import api from '../api/api.js'

export const useAuth = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['me'],
		queryFn: async () => {
			const res = await api.get('/auth/me')
			return res.data
		},
		retry: false
	})

	return {
		user: data || null,
		isLoading,
		error
	}
}
