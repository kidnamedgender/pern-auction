import React from 'react';
import cls from './menu.module.scss';

import { useSelector } from 'react-redux';

import { useNavigate, useLocation } from 'react-router-dom';

const Menu = () => {
  const { data } = useSelector((state) => state.authSlice);
  const roleCheck = useSelector((state) => state.authSlice.data?.role === 'admin');
  const navigate = useNavigate();
  const location = useLocation();

  const clickHandler = (route) => {
    if (location.pathname !== route) {
      navigate(route);
    }
  };

  const adminPanelDisplay = () => {
    return (
      <>
        <li onClick={() => clickHandler('/admin')}>Админ</li>
      </>
    );
  };

  return (
    <div className={cls.root}>
      <ul className={cls.menu__items}>
        <li onClick={() => clickHandler('/auctions')}>Аукционы</li>
        <li
          onClick={() => {
            !data
              ? navigate('/login', { state: { background: location } })
              : clickHandler('/my-lots');
          }}>
          Мои лоты
        </li>

        <li onClick={() => clickHandler('/add-lot')}>Продать</li>

        {roleCheck ? adminPanelDisplay() : ''}
        <li onClick={() => clickHandler('/help')}>Помощь</li>
      </ul>
    </div>
  );
};

export default Menu;
