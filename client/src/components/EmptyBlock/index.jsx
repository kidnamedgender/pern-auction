import React from 'react';
import cls from './emptyBlock.module.scss';

const EmptyBlock = ({ title, image }) => {
  return (
    <div className={cls.root}>
      <div className={cls.image}>
        <img src={image} alt="emptyImage" />
      </div>
      <div className={cls.title}>
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default EmptyBlock;
