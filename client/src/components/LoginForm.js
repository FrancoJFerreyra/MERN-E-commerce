import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, ErrorMessage, Field } from 'formik';
import serverRequest from '../api/serverRequest';
import FormRender from './FormRender';
import { loginErrors, loginInitialValues } from '../formikParameters';

const LoginForm = () => {
	const [onLoginFailed, setOnLoginFailed] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = async (values, { resetForm }) => {
		resetForm();
		try {
			await serverRequest.post('/user/login', values);
			navigate('/home');
		} catch (error) {
			navigate('/');
			setOnLoginFailed(true);
			setTimeout(() => {
				setOnLoginFailed(false);
			}, 2000);
		}
	};

	const renderLoginForm = ({ errors, values }) => (
		<Form className='col-sm-6 col-md-4'>
			{onLoginFailed ? <p className='text-danger'>Login error</p> : null}
			<div className='d-flex flex-column'>
				<label htmlFor='user' className='ps-2'>
					Email
				</label>
				<Field
					className='form-control'
					type='text'
					id='user'
					name='user'
					placeholder='email@email.com'
					value={values.user}
				/>
				<ErrorMessage
					name='user'
					component={() => (
						<div>
							<p className='text-danger pt-2 ps-2'>{errors.user}</p>
						</div>
					)}
				/>
			</div>
			<div className='d-flex flex-column'>
				<label htmlFor='password' className='ps-2'>
					Password
				</label>
				<Field
					className='form-control'
					type='password'
					autoComplete='on'
					id='password'
					name='password'
					placeholder='******'
					value={values.password}
				/>
				<ErrorMessage
					name='password'
					component={() => (
						<div>
							<p className='text-danger pt-2 ps-2'>{errors.password}</p>
						</div>
					)}
				/>
			</div>
			<div className='text-center pt-4'>
				<button type='submit' className='btn btn-primary'>
					Submit
				</button>
			</div>
		</Form>
	);

	return (
		<div>
			<FormRender
				onSubmit={handleSubmit}
				renderForm={renderLoginForm}
				initialValues={loginInitialValues}
				errors={loginErrors}
			>
				<p>
					You don't have an account?{' '}
					<span>
						<Link className='fw-bold' to='/register'>
							Sign in
						</Link>
					</span>
				</p>
			</FormRender>
		</div>
	);
};

export default LoginForm;
