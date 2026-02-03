import { useQuery } from '@tanstack/react-query'
import { getSummary, getUserBalance } from '../../api/api.user'

export const userBalance = () => {
	return useQuery({
		queryKey: ['balance'],
		queryFn: getUserBalance
	})
}
export const userSummary = () => {
	return useQuery({
		queryKey: ['ExIn'],
		queryFn: getSummary
	})
}
