import { useEffect, useState } from 'react';
import Header from './Header';
import serverRequest from '../api/serverRequest';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
	const [userData, setUserData] = useState({});
	const [loading, setLoading] = useState(true);
	const [expired, setExpired] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				const { data } = await serverRequest.get('/content/profile');
				setUserData(data);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
				setExpired(true);
				setTimeout(() => {
					navigate('/');
				}, 5000);
			}
		})();
	}, []);
	return (
		<>
			{expired ? (
				<div className='text-center'>
					<h1 className='text-danger'>You need login to see this page. Redirecting...</h1>
				</div>
			) : (
				<>
					{loading ? (
						<div className='d-flex justify-content-center align-items-center flex-column center__spinner'>
							<div className='spinner-border' role='status'>
								<span className='visually-hidden'>Loading...</span>
							</div>
						</div>
					) : (
						<>
							<Header />
							<div className='container-xxl profile__container'>
								<>
									<div className='text-center'>
										<h1>Account</h1>
									</div>
									<div>
										<div className='row justify-content-center pt-2'>
											<div className='col-md-6'>
												<div className='card'>
													<img src={userData.avatar} className='card-img-top' alt='Avatar' />
													<div className='card-body'>
														<ul>
															<li>Name: {userData.username}</li>
															<li>Lastname: {userData.lastname}</li>
															<li>Age: {userData.age}</li>
															<li>Email: {userData.email}</li>
															<li>Direction: {userData.direction}</li>
															<li>Phone: {userData.phone}</li>
														</ul>
													</div>
												</div>
											</div>
										</div>
									</div>
								</>
							</div>
						</>
					)}
				</>
			)}
		</>
	);
};

export default Profile;
