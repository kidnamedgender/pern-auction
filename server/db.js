import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('auctions', 'postgres', 'doradura', {
  dialect: 'postgres',
  host: 'localhost',
  port: '5432',
});

export default sequelize;
