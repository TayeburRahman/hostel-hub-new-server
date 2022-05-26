// language=TypeScript

import { Router } from 'express';
import { createMeal, getAllMeals, updateMeal } from './meal2.controller.js';

const meal2router = Router();

meal2router.route('/').get(getAllMeals).post(createMeal);
meal2router.route('/:id').patch(updateMeal);

export default meal2router;
