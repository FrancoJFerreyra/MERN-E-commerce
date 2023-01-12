import React from 'react';

const ProductCard = ({ product, children }) => {
	return (
		<div className='col-sm-4 col-lg-4'>
			<div className='card'>
				<img src={product.img} className='card-img-top' alt={product.title} />
				<div className='card-body'>
					<h5 className='card-title'>{product.title}</h5>
					<p className='card-text'>{product.description}</p>
					<p>Price: {product.price}usd</p>
					{children}
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
