import React from 'react';

import Modal from '../UI/Modal';
import Input from '../UI/Input';
import Button from '../UI/Button';
import HrefButton from '../UI/HrefButton';

import { fetchUserData } from '../redux/slices/authSlice';

import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

const AuthModal = ({ setToggle, toggle }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => Boolean(state.authSlice.data));

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (values) => {
    try {
      const data = await dispatch(fetchUserData(values));
      window.localStorage.setItem('token', data.payload.token);
    } catch (err) {
      return alert('Неправильные логин или пароль.');
    }
  };

  if (isAuth) {
    return <Navigate to="/auctions" />;
  }

  return (
    <Modal title="Авторизация">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          title="E-mail"
          type="email"
          {...register('email', { required: 'Введите свой e-mail' })}
          error={errors?.email?.message}
        />
        <Input
          title="Пароль"
          type="password"
          {...register('password', { required: 'Введите свой пароль' })}
          autocomplete="on"
          error={errors?.password?.message}
        />
        <Button type="submit" name="Войти"></Button>
      </form>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <HrefButton clickHandler={() => navigate(-1)} title="Назад" />
        <HrefButton clickHandler={() => setToggle(!toggle)} title="Регистрация" />
      </div>
    </Modal>
  );
};

export default AuthModal;
