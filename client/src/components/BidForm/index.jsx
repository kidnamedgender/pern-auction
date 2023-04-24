import React from 'react';
import cls from './bidForm.module.scss';

import Button from '../../UI/Button';
import Input from '../../UI/Input';

import { postBid } from '../../redux/slices/bidSlice';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

const BidForm = ({ current_price, currentLotId }) => {
  const location = useLocation();
  const { lotId, auctionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => Boolean(state.authSlice.data));
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      amount: 0,
    },
  });

  const onSubmit = (values) => {
    if (isAuth) {
      try {
        dispatch(postBid({ values, currentLotId })).then(() =>
          navigate(`/auctions/${auctionId}/${lotId}/bids`),
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      navigate('/login', { state: { background: location } });
    }
  };

  return (
    <div className={cls.root}>
      <div className={cls.current__bid}>
        <p>
          Текущая ставка: <b>{current_price} ₽</b>
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          title="Ваша ставка / ₽"
          min={0}
          type="number"
          {...register('amount', {
            required: true,
            validate: { moreThanPrev: (value) => parseFloat(value) >= current_price + 10 },
            maxLength: 10,
          })}
          error={
            (errors.amount && errors.amount.type === 'required' && 'Введите сумму') ||
            (errors.amount &&
              errors.amount.type === 'moreThanPrev' &&
              `Не менее ${current_price + 10} ₽`) ||
            (errors.amount && errors.amount.type === 'maxLength' && 'Сликшом много')
          }
          placeholder={`${current_price + 10} ₽`}
        />
        <Button type="submit" name="Поставить" />
      </form>
    </div>
  );
};

export default BidForm;
