import React from 'react';
import cls from './errorBlock.module.scss';

import HrefButton from '../../UI/HrefButton';

import { Link } from 'react-router-dom';

const ErrorBlock = ({ errType, errText }) => {
  return (
    <div className={cls.root}>
      <div className={cls.errInf}>
        <h1>
          {errType[0]}
          <span>{errType[1]}</span>
          {errType[2]}
        </h1>
        <p>{errText}</p>
        <Link style={{ textDecoration: 'none' }} to="/auctions">
          <HrefButton title="Вернуться на главную" />
        </Link>
      </div>
    </div>
  );
};

export default ErrorBlock;
