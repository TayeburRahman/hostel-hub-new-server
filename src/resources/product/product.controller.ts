import { deleteOne, getAll, getOne, updateOne } from '../../utility/factory.js';
import { createOne } from './../../utility/factory.js';
import ProductModel from './product.model.js';

export const getAllProduct = getAll(ProductModel, { path: 'userId' });
export const createProduct = createOne(ProductModel);
export const updateProduct = updateOne(ProductModel);
export const getProductByID = getOne(ProductModel);
export const deleteProduct = deleteOne(ProductModel);
