import { Router } from "express";
import { updateUserToAdmin } from "../auth/auth.controller.js";
import {
  createHostel,
  getHostelBuyAdminId,
  updateHostel,
} from "./hostel.controller.js";

const router = Router({ mergeParams: true });

router
  .route("/")
  .post(updateUserToAdmin, createHostel)
  .get(getHostelBuyAdminId);
router.route("/:id").get(getHostelBuyAdminId).patch(updateHostel);

export default router;
