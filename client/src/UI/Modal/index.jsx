import React from 'react';
import { useNavigate } from 'react-router-dom';
import cls from './modal.module.scss';

const Modal = ({ children, title }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(-1)} className={cls.overlay}>
      <div onClick={(e) => e.stopPropagation()} className={cls.root}>
        <div className={cls.content}>
          <h1>{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
