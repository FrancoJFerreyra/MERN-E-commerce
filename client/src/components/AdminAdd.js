import { useState } from 'react';
import Header from './Header';
import { Field, Form, ErrorMessage } from 'formik';
import FormRender from './FormRender';
import { Link } from 'react-router-dom';
import serverRequest from '../api/serverRequest';
import { addProductInitialValues, addProductsError } from '../formikParameters';
import ProductCard from './ProductCard';

const AdminAddForm = ({ productToUpdate }) => {
	const [addedProduct, setAddedProduct] = useState({});

	const handleSubmit = async (values, { resetForm }) => {
		resetForm();
		try {
			await serverRequest.post('/admin/add_product', values);
			setAddedProduct(values);
			alert('Agregado con exito.');
		} catch (error) {
			console.log(error);
		}
	};

	const renderAdminForm = ({ errors, values }) => (
		<Form className='col-sm-6 col-md-4'>
			<div className='d-flex flex-column'>
				<label htmlFor='title' className='ps-2'>
					Title
				</label>
				<Field
					className='form-control'
					type='text'
					id='title'
					name='title'
					placeholder='Adidas All Star'
					value={values.title ? values.title : productToUpdate.title}
				/>
				<ErrorMessage
					name='title'
					component={() => (
						<div>
							<p className='text-danger pt-2 ps-2'>{errors.title}</p>
						</div>
					)}
				/>
			</div>
			<div className='d-flex flex-column'>
				<label htmlFor='description' className='ps-2'>
					Description
				</label>
				<Field
					className='form-control'
					type='description'
					autoComplete='on'
					id='description'
					name='description'
					placeholder='Zapatillas adidas superstar unisex'
					value={values.description}
				/>
				<ErrorMessage
					name='description'
					component={() => (
						<div>
							<p className='text-danger pt-2 ps-2'>{errors.description}</p>
						</div>
					)}
				/>
			</div>
			<div className='d-flex flex-column'>
				<label htmlFor='img' className='ps-2'>
					Image
				</label>
				<Field
					className='form-control'
					type='img'
					autoComplete='on'
					id='img'
					name='img'
					placeholder='Image url'
					value={values.img}
				/>
				<ErrorMessage
					name='img'
					component={() => (
						<div>
							<p className='text-danger pt-2 ps-2'>{errors.img}</p>
						</div>
					)}
				/>
			</div>
			<div className='d-flex flex-column'>
				<label htmlFor='price' className='ps-2'>
					Price
				</label>
				<Field
					className='form-control'
					type='price'
					autoComplete='on'
					id='price'
					name='price'
					placeholder='Price'
					value={values.price}
				/>
				<ErrorMessage
					name='price'
					component={() => (
						<div>
							<p className='text-danger pt-2 ps-2'>{errors.price}</p>
						</div>
					)}
				/>
			</div>
			<div className='d-flex flex-column'>
				<label htmlFor='stock' className='ps-2'>
					Stock
				</label>
				<Field
					className='form-control'
					type='stock'
					autoComplete='on'
					id='stock'
					name='stock'
					placeholder='Zapatillas adidas superstar unisex'
					value={values.stock}
				/>
				<ErrorMessage
					name='stock'
					component={() => (
						<div>
							<p className='text-danger pt-2 ps-2'>{errors.stock}</p>
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
		<>
			<Header admin={true} />
			<div className='container-xxl'>
				<div className='text-center'>
					<h1>Add new product</h1>
				</div>
				<div>
					<FormRender
						renderForm={renderAdminForm}
						onSubmit={handleSubmit}
						errors={addProductsError}
						initialValues={addProductInitialValues}
					>
						<Link className='btn btn-primary' to='/home'>
							Go to home
						</Link>
					</FormRender>
				</div>
				{Object.keys(addedProduct).length > 0 ? (
					<div>
						<div>
							<h2>Added product</h2>
						</div>
						<div className='row m-0'>
							<ProductCard product={addedProduct} />
						</div>
					</div>
				) : null}
			</div>
		</>
	);
};

export default AdminAddForm;
