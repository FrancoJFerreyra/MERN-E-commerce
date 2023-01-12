import React from 'react';
import LoginForm from './LoginForm';

const Login = () => {
	return (
		<div className='loginComponent__container container-xxl'>
			<div className='text-center'>
				<h1>MERN Stack E-commerce</h1>
			</div>
			<div className='loginSection__container'>
				<div className='text-center'>
					<h2>Login</h2>
				</div>
				<LoginForm />
			</div>
		</div>
	);
};

export default Login;
