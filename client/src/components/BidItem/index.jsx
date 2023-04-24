import React from 'react';
import cls from './bidItem.module.scss';

const BidItem = ({ amount, user }) => {
  return (
    <li className={cls.root}>
      <div className={cls.user}>
        <i>{user}</i>
      </div>
      <div className={cls.amount}>
        <b>{amount} ₽</b>
      </div>
    </li>
  );
};

export default BidItem;
