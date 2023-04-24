import sequelize from '../db.js';
import { DataTypes } from 'sequelize';
import { Bid } from './Bid.js';
import { Result } from './Result.js';

const Lot = sequelize.define('lot', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  current_price: { type: DataTypes.FLOAT, allowNull: false },
  desc: { type: DataTypes.TEXT, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'pending' },
  end_date: { type: DataTypes.DATE, defaultValue: new Date() },
  imageURL: { type: DataTypes.STRING },
});

Lot.hasMany(Bid);
Bid.belongsTo(Lot);

export { Lot };
