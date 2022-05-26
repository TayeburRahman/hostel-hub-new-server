// language=TypeScript
// language=TypeScript
import { Router } from 'express';
import { MealController } from './meal.controller.js';

const mealRouter = Router();

const mealController = new MealController();

mealRouter
    .route('/')
    .get(mealController.getMeals)
    .post(mealController.createMeal);

mealRouter
    .route('/:id')
    .get(mealController.getMealById)
    .patch(mealController.updateMeal);

mealRouter.route('/user/:id').get(mealController.getMealsByUser);

mealRouter
    .route('/user/:id/date/:date')
    .get(mealController.getMealsByUserAndDate);

// aggregate all meals by hostel and current month
mealRouter.get('/hostel/:id', mealController.getMealsByHostelAndCurrentMonth);

mealRouter
    .route('/hostel/:id/date/:date')
    .get(mealController.getMealsByHostelAndDate);

mealRouter
    .route('/user/:id/hostel/:hostel')
    .get(mealController.getMealsByUserAndHostel);

mealRouter
    .route('/user/:id/hostel/:hostel/date/:date')
    .get(mealController.getMealsByUserAndHostelAndDate);

export default mealRouter;
