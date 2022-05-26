import { Router } from 'express';
import {
    acceptHostelBookingRequest,
    getAllHostelMember,
    rejectHostelMemberRequest,
} from './hostelMember.controller.js';

const hostelMemberRouter = Router();

hostelMemberRouter
    .route('/')
    .get(getAllHostelMember)
    .post(acceptHostelBookingRequest);

hostelMemberRouter.route('/:id').delete(rejectHostelMemberRequest);

export default hostelMemberRouter;
