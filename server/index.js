import express from 'express';
import sequelize from './db.js';
import { router as lotRouter } from './routes/lotRoute.js';
import { router as bidRouter } from './routes/bidRoute.js';
import { router as resultRouter } from './routes/resultRoute.js';
import { router as userRouter } from './routes/userRoute.js';
import { router as auctionRouter } from './routes/auctionRoute.js';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('assets'));
app.use(cors());

app.use('/lots', lotRouter);
app.use('/bids', bidRouter);
app.use('/results', resultRouter);
app.use('/users', userRouter);
app.use('/auctions', auctionRouter);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(4444, () => {
      console.log('Server Start');
    });
  } catch (err) {
    console.log(err);
  }
};

start();
