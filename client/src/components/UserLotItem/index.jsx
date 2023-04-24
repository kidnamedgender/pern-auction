import React from 'react';
import cls from './userLotItem.module.scss';

const LotItem = ({ title, currentBid, image, buyer, seller, sellDate }) => {
  return (
    <div className={cls.root}>
      <div className={cls.image__section}>
        <div className={cls.image}>
          <img src={image} alt="lot-preview" />
        </div>
      </div>
      <div className={cls.inf__section}>
        <div className={cls.top__row}>
          <div className={cls.title}>
            <h2>{title}</h2>
          </div>
          <div className={cls.date__time}>
            <p>
              {new Date(sellDate).toLocaleDateString()}
              <b>{new Date(sellDate).toLocaleTimeString()}</b>
            </p>
          </div>
        </div>

        <div className={cls.bot__row}>
          <div className={cls.user}>
            <p>
              Покупатель: <span>{buyer}</span>
            </p>
          </div>
          <div className={cls.user}>
            <p>
              Продавец: <span>{seller}</span>
            </p>
          </div>
        </div>
      </div>
      <div className={cls.right__section}>
        <div className={cls.current__bid}>
          <p>Победная ставка:</p>
          <b>{currentBid} ₽</b>
        </div>
      </div>
    </div>
  );
};

export default LotItem;
