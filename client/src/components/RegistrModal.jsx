import React from 'react';
import Modal from '../UI/Modal';
import Input from '../UI/Input';
import Button from '../UI/Button';
import HrefButton from '../UI/HrefButton';

import { useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRegister } from '../redux/slices/authSlice';

const RegistrModal = ({ setToggle, toggle }) => {
  const isAuth = useSelector((state) => Boolean(state.authSlice.data));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (values) => {
    try {
      const data = await dispatch(fetchUserRegister(values));
      console.log(data);
      window.localStorage.setItem('token', data.payload.token);
    } catch (err) {
      return alert('Не удалось зарегестрироваться');
    }
  };

  if (isAuth) {
    return <Navigate to="/auctions" />;
  }

  return (
    <Modal title="Регистрация">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          title="Имя"
          {...register('name', {
            required: 'Введите свое имя',
            minLength: 3,
            maxLength: 20,
          })}
          error={
            (errors.name && errors.name.type === 'required' && 'Введите свое имя') ||
            (errors.name && errors.name.type === 'minLength' && 'Больше 3 символов') ||
            (errors.name && errors.name.type === 'maxLength' && 'Не больше 20 символов')
          }></Input>
        <Input
          title="Фамилия"
          {...register('surname', {
            required: 'Введите свою фамилию',
            minLength: 3,
            maxLength: 20,
          })}
          error={
            (errors.surname && errors.surname.type === 'required' && 'Введите свою фамилию') ||
            (errors.surname && errors.surname.type === 'minLength' && 'Больше 3 символов') ||
            (errors.surname && errors.surname.type === 'maxLength' && 'Не больше 20 символов')
          }></Input>
        <Input
          title="E-mail"
          type="email"
          {...register('email', { required: 'Введите свой e-mail', maxLength: 40 })}
          error={
            (errors.email && errors.email.type === 'required' && 'Введите свою почту') ||
            (errors.email && errors.email.type === 'maxLength' && 'Не больше 40 символов')
          }></Input>
        <Input
          title="Пароль"
          type="password"
          autocomplete="on"
          {...register('password', {
            required: 'Введите свой пароль',
            minLength: 6,
            maxLength: 40,
          })}
          error={
            (errors.password && errors.password.type === 'required' && 'Введите свой пароль') ||
            (errors.password && errors.password.type === 'minLength' && 'Больше 6 символов') ||
            (errors.password && errors.password.type === 'maxLength' && 'Не больше 40 символов')
          }></Input>
        <Button name="Зарегестрироваться" type="submit"></Button>
      </form>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <HrefButton clickHandler={() => navigate(-1)} title="Назад" />
        <HrefButton clickHandler={() => setToggle(!toggle)} title="Логин" />
      </div>
    </Modal>
  );
};

export default RegistrModal;
