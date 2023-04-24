import React from 'react';
import cls from './auctionForm.module.scss';

import Input from '../../UI/Input';
import Button from '../../UI/Button';

import { postAuction } from '../../redux/slices/auctionSlice';

import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Title from '../../components/Title';

export const AuctionForm = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => Boolean(state.authSlice.data));
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: '',
      imageURL: {},
    },
  });

  const onSubmit = (values) => {
    if (isAuth) {
      try {
        dispatch(postAuction(values)).then(() => {
          navigate(`/auctions`);
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      navigate('/login', { state: { background: location } });
    }
  };

  React.useEffect(() => {
    window.scroll(260, 260);
  }, []);

  return (
    <div className={cls.root}>
      <Title hTitle="Создать аукцион" />
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
        <Input
          title="Название"
          {...register('title', {
            required: true,
            minLength: 3,
            maxLength: 65,
          })}
          error={
            (errors.title && errors.title.type === 'required' && 'Введите название') ||
            (errors.title && errors.title.type === 'minLength' && 'Больше 3 символов') ||
            (errors.title && errors.title.type === 'maxLength' && 'Не больше 65 символов')
          }
        />
        <Input
          title="Картинка"
          type="file"
          accept="image/png, image/jpeg"
          {...register('imageURL', {
            required: true,
          })}
          error={errors.amount && errors.imageURL.type === 'required' && 'Выберите фотографию'}
        />
        <Button type="submit" name="Создать аукцион" />
      </form>
    </div>
  );
};
