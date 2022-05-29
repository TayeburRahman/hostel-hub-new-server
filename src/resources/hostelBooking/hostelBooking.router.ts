import { Router } from "express";
import {
  createHostelBooking,
  getAllHostelBooking,
  getHostelBookingBuyId,
  updateHostelBooking,
} from "./hostelBooking.controller.js";

const hostelBookingRouter = Router();

hostelBookingRouter
  .route("/")
  .get(getAllHostelBooking)
  .post(createHostelBooking);

hostelBookingRouter
  .route("/:id")
  .get(getHostelBookingBuyId)
  .patch(updateHostelBooking);

export default hostelBookingRouter;
