import { useState } from 'react';
import { Form, ErrorMessage, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import serverRequest from '../api/serverRequest';
import { registerErrors, registerInitialValues } from '../formikParameters';
import FormRender from './FormRender';

const RegisterForm = () => {
	const [errorRegister, setErrorRegister] = useState({});

	const navigate = useNavigate();
	const handleSubmit = async (values, { resetForm }) => {
		resetForm();
		try {
			const register = await serverRequest.post('/user/register', values);
			navigate('/');
			console.log(register);
		} catch (error) {
			console.log(error);
			navigate('/register');
			setErrorRegister(error.response.data);
			setTimeout(() => {
				setErrorRegister(false);
			}, 2000);
		}
	};

	const renderRegisterForm = ({ values, errors }) => (
		<Form className='row'>
			<div className='d-flex flex-column col-sm-6'>
				<label htmlFor='avatar' className='ps-2'>
					Avatar
				</label>
				<Field
					name='avatar'
					id='avatar'
					type='url'
					placeholder='https://example.com'
					value={values.avatar}
					className='form-control'
				/>
				<ErrorMessage
					name='avatar'
					component={() => (
						<div>
							<p className='text-danger pt-2 ps-2'>{errors.avatar}</p>
						</div>
					)}
				/>
			</div>
			<div className='d-flex flex-column col-sm-6'>
				<label htmlFor='email' className='ps-2'>
					Email
				</label>
				<Field
					name='email'
					id='email'
					type='text'
					placeholder='email@email.com'
					value={values.email}
					className='form-control'
				/>
				<ErrorMessage
					name='email'
					component={() => (
						<div>
							<p className='text-danger pt-2 ps-2'>{errors.email}</p>
						</div>
					)}
				/>
			</div>
			<div className='d-flex flex-column col-sm-6'>
				<label htmlFor='username' className='ps-2'>
					Name
				</label>
				<Field
					name='username'
					id='username'
					type='text'
					placeholder='John'
					value={values.username}
					className='form-control'
				/>
				<ErrorMessage
					name='username'
					component={() => (
						<div>
							<p className='text-danger pt-2 ps-2'>{errors.username}</p>
						</div>
					)}
				/>
			</div>
			<div className='d-flex flex-column col-sm-6'>
				<label htmlFor='lastname' className='ps-2'>
					Lastname
				</label>
				<Field
					name='lastname'
					id='lastname'
					type='text'
					placeholder='Doe'
					value={values.lastname}
					className='form-control'
				/>
				<ErrorMessage
					name='lastname'
					component={() => (
						<div>
							<p className='text-danger pt-2 ps-2'>{errors.lastname}</p>
						</div>
					)}
				/>
			</div>
			<div className='d-flex flex-column col-sm-6'>
				<label htmlFor='password' className='ps-2'>
					Password
				</label>
				<Field
					name='password'
					id='password'
					type='password'
					placeholder='********'
					value={values.password}
					className='form-control'
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
			<div className='d-flex flex-column col-sm-6'>
				<label htmlFor='confirmPassword' className='ps-2'>
					Confirm password
				</label>
				<Field
					name='confirmPassword'
					id='confirmPassword'
					type='password'
					placeholder='********'
					value={values.confirmPassword}
					className='form-control'
				/>
				<ErrorMessage
					name='confirmPassword'
					component={() => (
						<div>
							<p className='text-danger pt-2 ps-2'>{errors.confirmPassword}</p>
						</div>
					)}
				/>
			</div>
			<div className='d-flex flex-column col-sm-6'>
				<label htmlFor='age' className='ps-2'>
					Age
				</label>
				<Field
					name='age'
					id='age'
					type='number'
					placeholder='18'
					value={values.age}
					className='form-control'
				/>
				<ErrorMessage
					name='age'
					component={() => (
						<div>
							<p className='text-danger pt-2 ps-2'>{errors.age}</p>
						</div>
					)}
				/>
			</div>
			<div className='d-flex flex-column col-sm-6'>
				<label htmlFor='phone' className='ps-2'>
					Phone
				</label>
				<Field
					name='phone'
					id='phone'
					type='number'
					placeholder='1122334455'
					value={values.phone}
					className='form-control'
				/>
				<ErrorMessage
					name='phone'
					component={() => (
						<div>
							<p className='text-danger pt-2 ps-2'>{errors.phone}</p>
						</div>
					)}
				/>
			</div>
			<div className='d-flex flex-column col-sm-6'>
				<label htmlFor='direction' className='ps-2'>
					Direction
				</label>
				<Field
					name='direction'
					id='direction'
					type='text'
					placeholder='Miami Beach 123'
					value={values.direction}
					className='form-control'
				/>
				<ErrorMessage
					name='direction'
					component={() => (
						<div>
							<p className='text-danger pt-2 ps-2'>{errors.direction}</p>
						</div>
					)}
				/>
			</div>
			<div className='text-center pt-4'>
				<button type='submit' className='btn btn-primary'>
					Register
				</button>
			</div>
		</Form>
	);

	return (
		<div className='container-sm'>
			{Object.keys(errorRegister).length > 0 ? (
				<div>
					<p className='text-danger'>
						This {Object.keys(errorRegister)[0]} is already registered, please try other or login.
					</p>
				</div>
			) : null}
			<FormRender
				onSubmit={handleSubmit}
				renderForm={renderRegisterForm}
				errors={registerErrors}
				initialValues={registerInitialValues}
			>
				<p>
					Already have account?{' '}
					<span>
						<Link to='/' className='fw-bold'>
							Log in
						</Link>
					</span>
				</p>
			</FormRender>
		</div>
	);
};

export default RegisterForm;
