import { Result } from '../models/Result.js';
import { Bid } from '../models/Bid.js';
import { User } from '../models/User.js';
import { Lot } from '../models/Lot.js';
import { Op } from 'sequelize';

const postResult = async (req, res) => {
  try {
    const lotId = req.params.id;
    const result = await Result.create({
      bidId: req.body.bidId,
      lotId: lotId,
    });
    await Lot.update(
      {
        status: 'finished',
        auctionId: null,
      },
      { where: { id: lotId } },
    );
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Не удалось загрузить результат' });
  }
};

const getResults = async (_, res) => {
  try {
    const findResults = await Result.findAll({
      attributes: { exclude: ['bidId'] },
      where: {
        bidId: {
          [Op.ne]: null,
        },
      },
      include: [
        {
          model: Bid,
          include: [{ model: Lot, include: [{ model: User }] }, { model: User }],
          attributes: { exclude: ['userId', 'lotId'] },
        },
      ],
    });
    res.status(200).json(findResults);
  } catch (err) {
    res.status(500).json(err);
  }
};

export { postResult, getResults };
