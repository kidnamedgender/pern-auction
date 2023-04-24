import { Bid } from '../models/Bid.js';
import { User } from '../models/User.js';
import { Lot } from '../models/Lot.js';
import { Result } from '../models/Result.js';
const getAllBids = async (_, res) => {
  try {
    const findBids = await Bid.findAll({
      attributes: { exclude: ['userId', 'lotId'] },
      include: [
        {
          model: User,
        },
        {
          model: Lot,
          attributes: { exclude: ['userId'] },
          include: {
            model: User,
          },
        },
      ],
    });
    res.status(200).json(findBids);
  } catch (err) {
    res.status(500).json({ message: 'Не удалось получить ставки' });
  }
};

const getBids = async (req, res) => {
  try {
    const currentLotId = req.params.id;
    const lot = await Lot.findOne({ where: { id: currentLotId } });
    const findBids = await Bid.findAll({
      attributes: { exclude: ['userId', 'lotId'] },
      include: [
        {
          model: User,
        },
        {
          model: Lot,
          attributes: { exclude: ['userId'] },
          include: {
            model: User,
          },
        },
      ],
      where: {
        lotId: currentLotId,
      },
    });

    res.status(200).json({ findBids, lotTitle: lot.title });
  } catch (err) {
    res.status(404).json({ message: 'Не удалось получить ставки по данному лоту' });
  }
};

const postBid = async (req, res) => {
  try {
    const lotId = req.params.id;
    const bid = await Bid.create({
      amount: req.body.amount,
      userId: req.userId,
      lotId,
    });
    await Lot.update(
      {
        current_price: req.body.amount,
      },
      { where: { id: lotId } },
    );
    res.status(201).json(bid);
  } catch (err) {
    res.status(500).json({ message: 'Не удалось сделать ставку' });
  }
};

const getMyLots = async (req, res) => {
  try {
    const myLots = await Result.findAll({
      attributes: { exclude: ['bidId'] },
      include: [
        {
          model: Bid,
          where: { userId: req.userId },
          attributes: { exclude: ['userId', 'lotId'] },
          include: [
            {
              model: Lot,
              attributes: { exclude: ['userId'] },
              include: {
                model: User,
              },
            },
            { model: User },
          ],
        },
      ],
    });
    res.status(200).json(myLots);
  } catch (err) {
    res.status(404).json({ message: 'Не удалось найти лоты данного пользователя.' });
  }
};

export { getAllBids, getBids, postBid, getMyLots };
