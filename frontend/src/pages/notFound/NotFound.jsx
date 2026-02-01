import { Link } from 'react-router'

export function NotFound() {
	return (
		<div className="flex items-center justify-center flex-col mt-[250px] w-[600px] mx-auto">
			<h1 className="text-4xl font-bold flex justify-between items-center">
				404 <span className="text-gray-500 font-light text-4xl ml-5">|</span>
				<span className="text-gray-600 text-[22px] text-center mt-1.5 font-medium ml-5">
					This page could not be found.
				</span>
			</h1>
			<Link
				className="underline text-2xl mt-8"
				to={'/'}
			>
				Go Home
			</Link>
		</div>
	)
}
