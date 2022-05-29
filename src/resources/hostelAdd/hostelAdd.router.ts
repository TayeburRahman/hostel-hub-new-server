import { Router } from "express";
import {
  createHostelAdd,
  getAllHostelAdd,
  getHostelAddBuyId,
  updateHostelAdd,
} from "./hostelAdd.controller.js";

const hostelAddRouter = Router({ mergeParams: true });

hostelAddRouter.route("/").get(getAllHostelAdd).post(createHostelAdd);
hostelAddRouter.route("/:id").get(getHostelAddBuyId).patch(updateHostelAdd);

export default hostelAddRouter;
