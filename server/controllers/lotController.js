import { Lot } from '../models/Lot.js';
import { User } from '../models/User.js';
import { Auction } from '../models/Auction.js';
import { Bid } from '../models/Bid.js';
const getLots = async (_, res) => {
  try {
    const findLots = await Lot.findAll({
      attributes: { exclude: ['userId', 'auctionId'] },
      include: [User, Auction],
    });
    res.status(200).json(findLots);
  } catch (err) {
    res.status(500).json({ message: 'error' });
  }
};

const createLot = async (req, res) => {
  try {
    const lot = await Lot.create({
      title: req.body.title,
      current_price: req.body.current_price,
      desc: req.body.desc,
      imageURL: `http://localhost:4444/static/lot-previews/${req.file.filename}`,
      userId: req.userId,
    });
    res.status(201).json(lot);
  } catch (err) {
    res.status(500).json({ message: 'Не удалось создать лот.' });
  }
};

const getAuctionLots = async (req, res) => {
  try {
    const currentAuctionId = req.params.id;
    const auction = await Auction.findOne({ where: { id: currentAuctionId } });
    const findAuctionLots = await Lot.findAll({
      attributes: { exclude: ['userId', 'auctionId'] },
      include: [User, Auction],
      where: {
        auctionId: currentAuctionId,
      },
    });
    res.status(200).json({ findAuctionLots, auctionTitle: auction.title });
  } catch (err) {
    res.status(404).json({ message: 'Не удалось найти лоты данного аукциона' });
  }
};

const getLot = async (req, res) => {
  try {
    const lotId = req.params.id;
    const findLot = await Lot.findAll({
      attributes: { exclude: ['userId', 'auctionId'] },
      include: [User, Auction],
      where: {
        id: lotId,
        status: 'exhibited',
      },
    });
    const bid = await Bid.findAll({ where: { lotId: lotId } });
    const username = findLot[0].user.name;
    const { id, title, status, imageURL, desc, end_date, current_price } = findLot[0];
    res.status(200).json({
      id,
      username,
      title,
      status,
      imageURL,
      desc,
      current_price,
      end_date,
      bidCount: bid.length,
    });
  } catch (err) {
    res.status(404).json({ message: 'Не удалось найти лот' });
  }
};

const addLotToAuction = async (req, res) => {
  try {
    const lotId = req.params.id;
    await Lot.update(
      {
        auctionId: req.body.auctionId,
        end_date: req.body.end_date,
        status: 'exhibited',
      },
      {
        attributes: { exclude: ['userId', 'auctionId'] },
        include: [User, Auction],
        where: {
          id: lotId,
        },
      },
    );
    res.status(200).json({ message: 'Лот успешно был определен на аукцион' });
  } catch (err) {
    res.status(500).json({ message: 'Не удалось добавить лот на аукцион' });
  }
};

const rejectLot = async (req, res) => {
  try {
    const lotId = req.params.id;
    await Lot.update(
      {
        status: 'rejected',
        auctionId: null,
      },
      {
        attributes: { exclude: ['userId', 'auctionId'] },
        include: [User, Auction],
        where: {
          id: lotId,
        },
      },
    );
    res.status(200).json({ message: 'Лот успешно был отклонен' });
  } catch (err) {
    res.status(500).json({ message: 'Не удалось отклонить лот' });
  }
};

export { getLots, getLot, createLot, getAuctionLots, addLotToAuction, rejectLot };
