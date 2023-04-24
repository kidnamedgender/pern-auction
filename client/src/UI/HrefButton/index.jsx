import React from 'react';
import cls from './hrefButton.module.scss';
const HrefButton = ({ title, clickHandler }) => {
  return (
    <i onClick={clickHandler} className={cls.root}>
      {title}
    </i>
  );
};

export default HrefButton;
