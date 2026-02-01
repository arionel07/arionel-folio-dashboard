import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home/Home.jsx'
import { NotFound } from './pages/notFound/NotFound.jsx'

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={<Home />}
					/>
					<Route
						path="*"
						element={<NotFound />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
