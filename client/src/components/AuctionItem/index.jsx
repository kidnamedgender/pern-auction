import React from 'react';
import cls from './auctionItem.module.scss';

const AuctionItem = ({ title, image }) => {
  return (
    <div className={cls.root}>
      <div className={cls.image}>
        <img src={image} alt="auction-preview" />
      </div>
      <div className={cls.title}>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default AuctionItem;
