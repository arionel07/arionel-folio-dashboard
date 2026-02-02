import { useQuery } from '@tanstack/react-query'
import { getUserBalance } from '../../api/api.user'

export const userBalance = () => {
	return useQuery({
		queryKey: ['balance'],
		queryFn: getUserBalance
	})
}
