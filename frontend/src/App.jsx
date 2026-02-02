import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/protect/ProtectedRoute'
import Login from './features/auth/Login.jsx'
import { Register } from './features/auth/Register.jsx'
import { CreateTransaction } from './features/createTransaction/CreateTransaction.jsx'
import Profile from './features/profile/Profile.jsx'
import Settings from './features/settings/Settings.jsx'
import { useAuth } from './hooks/useAuth.js'
import Dashboard from './pages/home/Dashboard.jsx'
import { DashboardsHome } from './pages/home/DashboardsHome.jsx'
import { NotFound } from './pages/notFound/NotFound.jsx'

function App() {
	const { user } = useAuth()

	return (
		<>
			<Routes>
				<Route
					path="/login"
					element={!user ? <Login /> : <Navigate to={'/dashboard'} />}
				/>
				<Route
					path="/register"
					element={!user ? <Register /> : <Navigate to={'/dashboard'} />}
				/>
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				>
					<Route
						index
						element={<DashboardsHome />}
					/>
					<Route
						path="create"
						element={<CreateTransaction />}
					/>
					<Route
						path="profile"
						element={<Profile />}
					/>
					<Route
						path="settings"
						element={<Settings />}
					/>
				</Route>
				<Route
					path="/"
					element={!user ? <Login /> : <Navigate to={'/dashboard'} />}
				/>
				<Route
					path="*"
					element={<NotFound />}
				/>
			</Routes>
		</>
	)
}

export default App
