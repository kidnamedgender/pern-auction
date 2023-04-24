import sequelize from '../db.js';
import { DataTypes } from 'sequelize';
import { Lot } from './Lot.js';

const Auction = sequelize.define('auction', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  imageURL: { type: DataTypes.STRING },
});

Auction.hasMany(Lot);
Lot.belongsTo(Auction);

export { Auction };
