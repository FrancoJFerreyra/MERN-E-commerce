import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import Cart from './Cart';
import AdminAdd from './AdminAdd';

const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/home' element={<Home />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/add_product' element={<AdminAdd />} />
			</Routes>
		</>
	);
};

export default App;
