import React from 'react';
import Button from '../../UI/Button';
import cls from './lotItem.module.scss';
import Timer from '../Timer';
import { Link } from 'react-router-dom';

const LotItem = ({ id, title, currentBid, image, user, date, status }) => {
  return (
    <div className={cls.root}>
      <div className={cls.image__section}>
        <div className={cls.image}>
          <img src={image} alt="lot-preview" />
        </div>
      </div>
      <div className={cls.inf__section}>
        <div className={cls.title}>
          <h2>{title}</h2>
        </div>
        <div className={cls.bot__row}>
          <div className={cls.timer}>
            <p>
              Времени осталось: <Timer date={date} />
            </p>
          </div>
          <div className={cls.user}>
            <p>{user}</p>
          </div>
        </div>
      </div>
      <div className={cls.bid__section}>
        <div className={cls.current__bid}>
          <p>Текущая ставка:</p>
          <b>{currentBid} ₽</b>
        </div>

        <div className={cls.button}>
          <Link to={`${id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <Button name="Подробнее" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LotItem;
