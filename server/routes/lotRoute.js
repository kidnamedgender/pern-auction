import express from 'express';
import multer from 'multer';
import path from 'path';
import checkAuth from '../middleware/checkAuth.js';
import {
  getLots,
  createLot,
  getLot,
  addLotToAuction,
  rejectLot,
} from '../controllers/lotController.js';
import { postResult } from '../controllers/resultController.js';
import { postBid, getBids } from '../controllers/bidController.js';
import checkAdminRights from '../middleware/checkAdminRights.js';
import checkLotState from '../middleware/checkLotState.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: './assets/lot-previews',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.get('/', getLots);
router.get('/:id', getLot);
router.get('/:id/bids', getBids);
router.post('/add-lot', checkAuth, upload.single('imageURL'), createLot);
router.post('/:id/add-bid', checkAuth, checkLotState, postBid);
router.post('/:id/result', checkLotState, postResult);
router.patch('/:id/add-to-auction', checkAuth, checkAdminRights, addLotToAuction);
router.patch('/:id/remove-lot', checkAuth, checkAdminRights, rejectLot);

export { router };
