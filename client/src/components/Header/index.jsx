import React from 'react';
import cls from './header.module.scss';

import Menu from '../Menu';
import HrefButton from '../../UI/HrefButton';

import logo from '../../../img/logo.png';

import { logout } from '../../redux/slices/authSlice';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => Boolean(state.authSlice.data));
  const { data } = useSelector((state) => state.authSlice);
  const location = useLocation();
  const navigation = useNavigate();

  const logoutHandler = () => {
    if (confirm('Вы точно хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
      navigation('/auctions');
    }
  };

  return (
    <div className={cls.root}>
      <div className={cls.header__row}>
        <div className={cls.logo}>
          <Link to="/auctions">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <ul className={cls.menu}>
          {isAuth ? (
            <>
              <li className={cls.greeting}>
                <span>Здравствуйте, </span>
                <HrefButton title={data?.name}></HrefButton>
              </li>
              <li onClick={logoutHandler}>Выйти</li>
            </>
          ) : (
            <Link
              style={{ color: '#000000', textDecoration: 'none' }}
              to={'login'}
              state={{ background: location }}>
              <li>Войти</li>
            </Link>
          )}
        </ul>
      </div>
      <Menu />
    </div>
  );
};

export default Header;
