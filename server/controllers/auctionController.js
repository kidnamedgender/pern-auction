import { Auction } from '../models/Auction.js';
import { Lot } from '../models/Lot.js';

const getAuctions = async (_, res) => {
  try {
    const findAuctions = await Auction.findAll();
    const lot = await Lot.findAll({ where: { status: 'exhibited' } });
    const lotCount = lot.map((lot) => lot.auctionId);
    res.status(200).json({ findAuctions, lotCount });
  } catch (err) {
    res.status(404).json({ message: 'Не удалось найти аукционы.' });
  }
};

const createAuction = async (req, res) => {
  try {
    const auction = await Auction.create({
      title: req.body.title,
      imageURL: `http://localhost:4444/static/auction-previews/${req.file.filename}`,
    });
    res.status(201).json(auction);
  } catch (err) {
    res.status(500).json({ message: 'Не удалось создать аукцион.' });
  }
};

export { getAuctions, createAuction };
