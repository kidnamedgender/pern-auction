import React from 'react';
import cls from './title.module.scss';
import HrefButton from '../../UI/HrefButton';

import { useNavigate } from 'react-router-dom';

const Title = ({ hTitle, bTitle, sTitle, clickHandler, role }) => {
  const navigate = useNavigate();
  return (
    <div className={cls.root}>
      <h1 className={sTitle ? cls.subline : ''}>
        {hTitle} {sTitle ? <span>« {sTitle} »</span> : ''}
      </h1>
      {role === undefined ? (
        <HrefButton title="Назад" clickHandler={() => navigate(-1)} />
      ) : role ? (
        <HrefButton title={bTitle} clickHandler={clickHandler} />
      ) : (
        ''
      )}
    </div>
  );
};

export default Title;
