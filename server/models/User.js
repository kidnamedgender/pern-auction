import { DataTypes } from 'sequelize';
import sequalize from '../db.js';

import { Lot } from './Lot.js';
import { Bid } from './Bid.js';

const User = sequalize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  surname: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'user' },
});

User.hasMany(Lot);
Lot.belongsTo(User);

User.hasMany(Bid);
Bid.belongsTo(User);

export { User };
