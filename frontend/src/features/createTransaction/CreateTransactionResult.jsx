export default function CreateTransactionResult({ type, message, onClose }) {
	const success = type === 'success'
	return (
		<div className="fixed inset-0 bg-black/40 dark:bg-white/40 flex items-center justify-center z-50 backdrop-blur-sm">
			<div
				className={`bg-white dark:bg-[#282828] rounded-xl p-6 w-full max-w-sm border-2 animate-fadeIn ${success ? 'border-green-500' : 'border-red-500'}`}
			>
				<h2
					className={`text-lg font-bold mb-2  ${success ? 'text-green-600' : 'text-red-600'}`}
				>
					{success ? 'Transaction Created' : 'Error'}
				</h2>
				<p className="text-sm text-gray-600 dark:text-gray-200 mb-4">
					{typeof message === 'string' ? message : 'Unknown error'}
				</p>
				<button
					className="w-full bg-black text-white py-2 rounded cursor-pointer"
					onClick={onClose}
				>
					OK
				</button>
			</div>
		</div>
	)
}
