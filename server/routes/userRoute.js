import express from 'express';
import { registration, login, getMe } from '../controllers/userController.js';
import checkAuth from '../middleware/checkAuth.js';
import { getMyLots } from '../controllers/bidController.js';
const router = express.Router();

router.post('/registration', registration);
router.post('/login', login);
router.get('/get-me', checkAuth, getMe);
router.get('/my-lots', checkAuth, getMyLots);

export { router };
