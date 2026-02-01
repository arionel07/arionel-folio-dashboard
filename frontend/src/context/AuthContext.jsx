import { useQuery } from '@tanstack/react-query'
import { createContext, useContext } from 'react'
import api from '../api/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
	const { data, isLoading } = useQuery({
		queryKey: ['me'],
		queryFn: async () => {
			try {
				const res = await api.get('/auth/me')
				return res.data
			} catch (error) {
				console.error('Error in authProvider', error.message)
				return null
			}
		},
		retry: false
	})

	return (
		<AuthContext.Provider
			value={{
				user: data,
				isLoading
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
