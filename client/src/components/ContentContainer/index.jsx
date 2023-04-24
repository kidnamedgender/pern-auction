import React from 'react';
import cls from './contentContainter.module.scss';

const ContentContainer = ({ children }) => {
  return <div className={cls.root}>{children}</div>;
};

export default ContentContainer;
