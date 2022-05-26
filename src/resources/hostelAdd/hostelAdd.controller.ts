import { createOne, getAll, getOne, updateOne } from '../../utility/factory.js';
import hostelAddModel from './hostelAdd.model.js';

export const getAllHostelAdd = getAll(hostelAddModel);
export const getHostelAddBuyId = getOne(hostelAddModel, { path: 'hostel' });
export const createHostelAdd = createOne(hostelAddModel);
export const updateHostelAdd = updateOne(hostelAddModel);
