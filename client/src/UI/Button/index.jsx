import React from 'react';
import cls from './button.module.scss';
const Button = ({ name, clickHandler, type }) => {
  return (
    <button
      onClick={clickHandler ? clickHandler : null}
      type={type ? type : ''}
      className={cls.root}>
      {name}
    </button>
  );
};

export default Button;
