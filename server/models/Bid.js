import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import { Result } from './Result.js';

const Bid = sequelize.define('bid', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  amount: { type: DataTypes.FLOAT, allowNull: false },
});

Bid.hasOne(Result);
Result.belongsTo(Bid);

export { Bid };
