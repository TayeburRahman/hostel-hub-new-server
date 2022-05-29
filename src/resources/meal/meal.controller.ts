import { Request, Response } from "express";
import {
  createMeal,
  getMealById,
  getMeals,
  getMealsByHostelAndCurrentMonth,
  getMealsByHostelAndDate,
  getMealsByHostelAndMonth,
  getMealsByHostelAndYear,
  getMealsByUser,
  getMealsByUserAndDate,
  getMealsByUserAndHostel,
  getMealsByUserAndHostelAndDate,
  getMealsByUserAndMonth,
  getMealsByUserAndYear,
  updateMeal,
} from "./meal.service.js";

export class MealController {
  constructor() {}

  async getMeals(req: Request, res: Response) {
    const meals = await getMeals();
    res.json(meals);
  }

  async getMealById(req: Request, res: Response) {
    const meal = await getMealById(req.params.id);
    res.json(meal);
  }

  async createMeal(req: Request, res: Response) {
    console.log("mealService");
    try {
      const meal = await createMeal(req.body);
      res.json(meal);
    } catch (error: any) {
      res.status(400).json({ error });
    }
  }

  async updateMeal(req: Request, res: Response) {
    const meal = await updateMeal(req.params.id, req.body);
    res.json(meal);
  }

  async getMealsByUser(req: Request, res: Response) {
    const meals = await getMealsByUser(req.params.id);
    res.json(meals);
  }

  async getMealsByUserAndDate(req: Request, res: Response) {
    const meals = await getMealsByUserAndDate(req.params.id, req.params.date);
    res.json(meals);
  }

  async getMealsByHostelAndDate(req: Request, res: Response) {
    const meals = await getMealsByHostelAndDate(req.params.id, req.params.date);
    res.json(meals);
  }

  async getMealsByUserAndHostel(req: Request, res: Response) {
    const meals = await getMealsByUserAndHostel(
      req.params.id,
      req.params.hostel
    );
    res.json(meals);
  }

  async getMealsByUserAndHostelAndDate(req: Request, res: Response) {
    const meals = await getMealsByUserAndHostelAndDate(
      req.params.id,
      req.params.hostel,
      req.params.date
    );
    res.json(meals);
  }

  // aggregate all meals by user and month
  async getMealsByUserAndMonth(req: Request, res: Response) {
    const meals = await getMealsByUserAndMonth(req.params.id, req.params.month);
    res.json(meals);
  }

  // aggregate all meals by user and year
  async getMealsByUserAndYear(req: Request, res: Response) {
    const meals = await getMealsByUserAndYear(req.params.id, req.params.year);
    res.json(meals);
  }

  // aggregate all meals by hostel and month
  async getMealsByHostelAndMonth(req: Request, res: Response) {
    const meals = await getMealsByHostelAndMonth(
      req.params.id,
      req.params.month
    );
    res.json(meals);
  }

  // aggregate all meals by hostel and current month
  async getMealsByHostelAndCurrentMonth(req: Request, res: Response) {
    const meals = await getMealsByHostelAndCurrentMonth(req.params.id);
    res.json(meals);
  }

  // aggregate all meals by hostel and year
  async getMealsByHostelAndYear(req: Request, res: Response) {
    const meals = await getMealsByHostelAndYear(req.params.id, req.params.year);
    res.json(meals);
  }
}
