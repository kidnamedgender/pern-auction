import { Lot } from '../models/Lot.js';
export default async (req, res, next) => {
  const lotId = req.params.id;
  const findLot = await Lot.findOne({ where: { id: lotId } });
  if (findLot.status === 'exhibited') {
    next();
  } else {
    res.status(401).json({ message: 'Данный лот недоступен' });
  }
};
