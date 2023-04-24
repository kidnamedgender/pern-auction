import React from 'react';
import cls from './lotForm.module.scss';

import Input from '../../UI/Input';
import Button from '../../UI/Button';
import Title from '../../components/Title';
import { postLot } from '../../redux/slices/lotSlice';

import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

export const LotForm = () => {
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
      desc: '',

      imageURL: {},
    },
  });

  const onSubmit = (values) => {
    if (isAuth) {
      try {
        dispatch(postLot(values)).then(() => {
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
    window.scroll(380, 370);
  }, []);

  return (
    <div className={cls.root}>
      <Title hTitle="Продать лот" />
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
        <Input
          title="Название"
          {...register('title', {
            required: true,
            minLength: 3,
            maxLength: 80,
          })}
          error={
            (errors.title && errors.title.type === 'required' && 'Введите название') ||
            (errors.title && errors.title.type === 'minLength' && 'Больше 3 символов') ||
            (errors.title && errors.title.type === 'maxLength' && 'Не больше 80 символов')
          }
        />
        <Input
          title="Краткое описание"
          {...register('desc', {
            required: true,
            minLength: 10,
            maxLength: 1000,
          })}
          error={
            (errors.desc && errors.desc.type === 'required' && 'Введите описание') ||
            (errors.desc && errors.desc.type === 'minLength' && 'Больше 10 символов') ||
            (errors.desc && errors.desc.type === 'maxLength' && 'Не больше 1000 символов')
          }
        />
        <Input
          title="Начальная цена / ₽"
          min={0}
          type="number"
          {...register('current_price', {
            required: true,
            maxLength: 8,
            validate: { minValue: (value) => parseFloat(value) >= 100 },
          })}
          error={
            (errors.current_price && errors.current_price.type === 'required' && 'Введите сумму') ||
            (errors.current_price &&
              errors.current_price.type === 'minValue' &&
              'Не менее 100 ₽') ||
            (errors.current_price && errors.current_price.type === 'maxLength' && 'Слишком много')
          }
          placeholder="100 ₽"
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
        <Button type="submit" name="Отправить на проверку" />
      </form>
    </div>
  );
};
