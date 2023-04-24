import React from 'react';
import cls from './pendingLotItem.module.scss';
import Timer from '../Timer';
import ConfirmLotForm from '../ConfirmLotForm';
const PendingLotItem = ({ id, title, currentBid, image, user, date, desc }) => {
  return (
    <div className={cls.root}>
      <div className={cls.image__border}>
        <div className={cls.image__section}>
          <div className={cls.image}>
            <img src={image} alt="lot-preview" />
          </div>
        </div>
      </div>
      <div className={cls.inf__section}>
        <div className={cls.title}>
          <h2>{title}</h2>
          <p>{desc}</p>
        </div>

        <div className={cls.bot__row}>
          <div className={cls.timer}>
            <p>
              Времени осталось: <span>-</span>
            </p>
          </div>
          <div className={cls.user}>
            <p>{user}</p>
          </div>
        </div>
      </div>
      <div className={cls.bid__section}>
        <div className={cls.current__bid}>
          <p>Начальная цена:</p>
          <b>{currentBid} ₽</b>
        </div>
        <ConfirmLotForm lotId={id} />
      </div>
    </div>
  );
};

export default PendingLotItem;
