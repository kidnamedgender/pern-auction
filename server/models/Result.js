import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

const Result = sequelize.define('result', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
});
export { Result };
