import React from 'react';
import RegisterForm from './RegisterForm';

const Register = () => {
	return (
		<div>
			<div className='text-center'>
				<h1>MERN Stack E-commerce</h1>
			</div>
			<div>
				<div className='text-center'>
					<h2>Register</h2>
				</div>
				<RegisterForm />
			</div>
		</div>
	);
};

export default Register;
