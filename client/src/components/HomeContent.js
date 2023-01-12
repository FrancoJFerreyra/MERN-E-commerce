import React from 'react';
import ProductCard from './ProductCard';
import serverRequest from '../api/serverRequest';
import { Link } from 'react-router-dom';

const HomeContent = ({ listOfProducts, admin, setExpired }) => {
	const handleClick = async (e) => {
		e.preventDefault();
		try {
			const addProduct = await serverRequest.post(`/content/cart/${e.target.dataset.id}`);
			alert('Producto agregado');
		} catch (error) {
			console.log(error);
			setExpired(true);
		}
	};

	const handleRemoveDB = async (e) => {
		e.preventDefault();
		try {
			const remove = await serverRequest.delete(`/admin/delete_product/${e.target.dataset.id}`);
			console.log(remove);
		} catch (error) {
			console.log(error);
			setExpired(true);
		}
	};

	const handleUpdateDB = async (e) => {
		//Tengo que buscar la vuelta sobre como Actualizar un producto
		e.preventDefault();
		try {
		} catch (error) {}
	};

	return (
		<div className='container-xxl home__container'>
			<div className='text-center'>
				<h1>MERN Stack e-commerce</h1>
			</div>
			<div className='home__container--productsList'>
				<div>
					<h2>Products</h2>
				</div>
				<div className='container-md productsList__container'>
					<div className='row productList__item--container'>
						{listOfProducts.map((product) => (
							<ProductCard key={product._id} product={product}>
								{admin ? (
									<>
										<button
											type='submit'
											onClick={handleRemoveDB}
											data-id={product._id}
											className='btn btn-danger'
										>
											Remove
										</button>
										<button
											type='submit'
											onClick={handleUpdateDB}
											data-id={product._id}
											className='btn btn-light'
										>
											Update
										</button>
									</>
								) : (
									<button
										type='submit'
										onClick={handleClick}
										data-id={product._id}
										className='btn btn-primary'
									>
										Add to cart
									</button>
								)}
							</ProductCard>
						))}
					</div>
				</div>
				{admin ? (
					<div className='text-end'>
						<Link to='/add_product'>
							<i className='fa-solid fa-plus p-4 addProduct__icon'></i>
						</Link>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default HomeContent;
