import React from 'react';
import { Link } from 'react-router-dom';

import cls from './adminPanel.module.scss';

import Title from '../../components/Title';

const AdminPanel = () => {
  return (
    <div className={cls.root}>
      <Title hTitle="Панель администратора"></Title>
      <div className={cls.admin__blocks}>
        <Link to="/confirm-lot" style={{ textDecoration: 'none', color: 'black' }}>
          <div className={cls.admin__block}>Ожидающие подтверждения</div>
        </Link>

        <Link to="/all-results" style={{ textDecoration: 'none', color: 'black' }}>
          <div className={cls.admin__block}>История сделок</div>
        </Link>

        <Link to="/create-auction" style={{ textDecoration: 'none', color: 'black' }}>
          <div className={cls.admin__block}>Создать аукцион</div>
        </Link>
      </div>
    </div>
  );
};

export default AdminPanel;
