import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import avatarPreview from '../../../public/avatar.png'
import { getMe } from '../../api/auth.api'
import { patchUserProfile } from '../../api/profile.api'

export default function Profile() {
	const queryClient = useQueryClient()
	const [preview, setPreview] = useState(null)

	const { register, handleSubmit, reset } = useForm({
		defaultValues: { name: '', avatar: null }
	})

	const { data: user, isLoading } = useQuery({
		queryKey: ['me'],
		queryFn: getMe
	})
	const mutation = useMutation({
		mutationFn: patchUserProfile,
		onSuccess: () => {
			queryClient.invalidateQueries(['me'])
			alert('Profile Updated!')
			setPreview(null)
		}
	})

	useEffect(() => {
		if (user) {
			reset({ name: user.name })
		}
	}, [user, reset])

	const onSubmit = data => {
		mutation.mutate(data)
	}

	if (isLoading) return <div>Loading...</div>
	return (
		<div className="w-[500px] mt-35 mx-auto">
			<div className="flex items-center justify-center flex-col bg-white p-6 dark:bg-[#282828] rounded-lg text-center">
				<h4 className="font-bold text-3xl mb-5">profile</h4>

				<div className="flex flex-col">
					<div className="my-3 mx-auto w-[75px] h-[75px]">
						<img
							src={preview || user?.avatar || avatarPreview}
							alt="Profile User Avatar"
							className="w-full h-full object-cover rounded-[100%]"
						/>
					</div>
					<span className="mt-3 uppercase font-light text-lg">
						{user?.name}
					</span>
					<span className="font-light text-lg">{user?.email}</span>
				</div>
				<div className="mt-8 mb-3">
					<form
						className="flex flex-col items-center"
						onSubmit={handleSubmit(onSubmit)}
					>
						<input
							type="text"
							placeholder="Change Name..."
							className="border outline-none p-2 w-[250px] rounded-lg mb-3"
							{...register('name')}
						/>
						<input
							type="text"
							placeholder="Change Avatar (url)..."
							className="border outline-none p-2 w-[250px] rounded-lg mb-3"
							{...register('avatar')}
						/>

						<button
							className="cursor-pointer mt-2 bg-black text-teal-50 p-3 rounded-lg w-[250px] dark:bg-amber-50 dark:text-black transition-all duration-300 hover:opacity-85"
							disabled={mutation.isLoading}
							type="submit"
						>
							{mutation.isLoading ? 'Saving...' : 'Save'}
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}
