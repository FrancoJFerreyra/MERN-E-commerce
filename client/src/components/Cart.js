import { useState, useEffect } from 'react';
import Header from './Header';
import serverRequest from '../api/serverRequest';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';

const Cart = () => {
	const [cartProducts, setCartProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [expired, setExpired] = useState(false);

	const navigate = useNavigate();

	//necesito volver a renderizar los productos del carrito cada ve que se remueve alguno o se compra el carrito

	useEffect(() => {
		(async () => {
			try {
				const { data } = await serverRequest.get('/content/cart');
				setCartProducts(data);
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

	const total = cartProducts.reduce((acc, current) => acc + current.price, 0);

	const handleRemove = async (e) => {
		e.preventDefault();
		try {
			const deleteProduct = await serverRequest.delete(`/content/cart/${e.target.dataset.id}`);
			const newCart = cartProducts.filter((product) => product._id !== e.target.dataset.id);
			setCartProducts(newCart);
			// alert('Producto eliminado');
		} catch (error) {
			console.log(error);
			setExpired(true);
		}
	};

	const handleBuyClick = async (e) => {
		e.preventDefault();
		try {
			const buy = await serverRequest.get('/content/cart/buy');
			setCartProducts([]);
		} catch (error) {
			console.log(error);
			setExpired(true);
		}
	};

	const handleDeleteClick = async (e) => {
		e.preventDefault();
		try {
			const empty = await serverRequest.get('/content/cart/empty');
			setCartProducts([]);
			// alert('carrito vaciado con exito');
		} catch (error) {
			console.log(error);
			setExpired(true);
		}
	};

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
							<div className='container-xxl'>
								<div className='text-center'>
									<h1>Cart</h1>
								</div>
								{cartProducts.length > 0 ? (
									<>
										<div className='row m-0'>
											{cartProducts.map((product) => (
												<ProductCard key={product._id} product={product}>
													<button
														type='submit'
														onClick={handleRemove}
														data-id={product._id}
														className='btn btn-danger'
													>
														Remove
													</button>
												</ProductCard>
											))}
										</div>

										<div className='text-center'>
											<div className='pb-3 pt-3'>
												<h6>Total = {total} usd</h6>
											</div>
											<div className='pb-4'>
												<button type='submit' onClick={handleBuyClick} className='btn btn-success'>
													Buy cart
												</button>
												<button
													type='submit'
													onClick={handleDeleteClick}
													className='btn btn-danger'
												>
													Empty cart
												</button>
											</div>
										</div>
									</>
								) : (
									<div>
										<div className='text-center pt-4'>
											<h2>Cart it's empty</h2>
										</div>
										<div className='text-center pt-3'>
											<Link to='/home' className='btn btn-primary'>
												Go to home
											</Link>
										</div>
									</div>
								)}
							</div>
						</>
					)}
				</>
			)}
		</>
	);
};

export default Cart;
