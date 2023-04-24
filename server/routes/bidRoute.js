import express from 'express';
import { getAllBids } from '../controllers/bidController.js';

const router = express.Router();

router.get('/', getAllBids);

export { router };
