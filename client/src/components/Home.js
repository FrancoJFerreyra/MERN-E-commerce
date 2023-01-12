import { useState, useEffect } from 'react';
import Header from './Header';
import { useNavigate, Link } from 'react-router-dom';
import serverRequest from '../api/serverRequest';
import HomeContent from './HomeContent';

//PENDIENTES:
//TENGO QUE AGREGAR LA VERIFICACION DE QUE LA COOKIE EXISTE EN TODO DONDE SE HAGAN PETICIONES,
//CREAR EL FORMULARIO PARA AGREGAR PRODUCTOS A LA DB
//ELIMINAR EL BOTON DE LOGOUT EN BASE A LA MEDIDA DE PANTALLA

const Home = () => {
	const [listOfProducts, setListOfProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [expired, setExpired] = useState(false);

	const navigate = useNavigate();
	const { admin, products } = listOfProducts;

	useEffect(() => {
		(async () => {
			try {
				const res = await serverRequest.get('/content/products');
				setListOfProducts(res.data);
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
							<Header admin={admin} />
							<HomeContent listOfProducts={products} admin={admin} setExpired={setExpired} />
						</>
					)}
				</>
			)}
		</>
	);
};

export default Home;
