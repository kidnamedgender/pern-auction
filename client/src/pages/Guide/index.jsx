import React from 'react';
import Title from '../../components/Title';
import cls from './guide.module.scss';

const Guide = () => {
  return (
    <div className={cls.root}>
      <Title bTitle="Назад" />
      <img src="/img/large-one.png" alt="" />
    </div>
  );
};

export default Guide;
