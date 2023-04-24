import express from 'express';
import multer from 'multer';
import path from 'path';
import checkAuth from '../middleware/checkAuth.js';
import checkAdminRights from '../middleware/checkAdminRights.js';
import { getAuctions, createAuction } from '../controllers/auctionController.js';
import { getAuctionLots } from '../controllers/lotController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: './assets/auction-previews',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
router.get('/', getAuctions);
router.post('/add-auction', checkAuth, checkAdminRights, upload.single('imageURL'), createAuction);
router.get('/:id/lots', getAuctionLots);

export { router };
