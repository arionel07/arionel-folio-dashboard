import { userBalance, userSummary } from '../../features/user/userBalance'

export function summary() {
	const { data, isLoading } = userBalance()
	const { datas } = userSummary()

	if (isLoading) {
		;<div>Loading...</div>
	}

	return (
		<div className="">
			<div className="">
				<p></p>
				<p></p>
			</div>

			<div className="">
				<p></p>
				<p></p>
			</div>

			<div className="">
				<p></p>
				<p></p>
			</div>
		</div>
	)
}
