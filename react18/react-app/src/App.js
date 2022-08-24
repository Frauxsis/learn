import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import Layout from './components/Layout';
import AuthForrmPage from './pages/AuthForrmPage';

const App = () => {
	return (
		<Layout>
			<Routes>
				<Route path={'/'} element={<HomePage />} />
				<Route path={'profile'} element={<ProfilePage />} />
				<Route path={'auth-form'} element={<AuthForrmPage />} />
			</Routes>
		</Layout>
	);
};

export default App;
