import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import serverRequest from '../api/serverRequest';

const Header = ({ admin }) => {
	const navigate = useNavigate();

	const handleClick = async () => {
		await serverRequest.get('/user/logout');
		navigate('/');
	};

	return (
		<Navbar expand='lg'>
			<div className='container-xxl'>
				<Link to='/home' className='navbar-brand'>
					MERN
				</Link>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto' as='ul'>
						<li>
							<Link to='/home' className='nav-link'>
								Home
							</Link>
						</li>
						{admin ? (
							<li>
								<Link to='/add_product' className='nav-link'>
									Add new product
								</Link>
							</li>
						) : (
							<>
								<li>
									<Link to='/profile' className='nav-link'>
										Profile
									</Link>
								</li>
								<li>
									<Link to='/cart' className='nav-link'>
										Cart
									</Link>
								</li>
							</>
						)}
					</Nav>
					<div className='logout__btn--mobile'>
						<button className='btn btn-danger' type='submit' onClick={handleClick}>
							Logout
						</button>
					</div>
				</Navbar.Collapse>
				<div className='logout__btn'>
					<button className='btn btn-danger' type='submit' onClick={handleClick}>
						Logout
					</button>
				</div>
			</div>
		</Navbar>
	);
};

export default Header;
