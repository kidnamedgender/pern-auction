import React from 'react';
import cls from './confirmLotForm.module.scss';

import Input from '../../UI/Input';
import Button from '../../UI/Button';

import { patchLotToAuction, rejectLot } from '../../redux/slices/lotSlice';
import { getAllLots } from '../../redux/slices/lotsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';

const ConfirmLotForm = ({ lotId }) => {
  const { auctions } = useSelector((state) => state.auctionSlice);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      end_date: '',
      auction: '',
    },
  });
  const navigate = useNavigate();

  const onSubmit = (values) => {
    const { id } = auctions.find((auction) => auction.title.trim() === values.auction.trim());
    const end_date = values.end_date;
    const data = { auctionId: id, end_date };
    dispatch(patchLotToAuction({ data, lotId })).then(() => dispatch(getAllLots()));
  };

  const denyClickHandler = () => {
    if (confirm('Вы действительно хотите отклонить данный лот?')) {
      dispatch(rejectLot(lotId)).then(() => dispatch(getAllLots()));
    }
  };

  return (
    <>
      <form className={cls.root} onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('end_date', { required: true })}
          title="Дата окончания"
          type="datetime-local"
        />
        <p>Аукцион</p>
        <select {...register('auction', { required: true })} className={cls.auction__select}>
          <option disabled>Выберите аукцион...</option>
          {auctions.map((auction) => (
            <option key={auction.id}>{auction.title}</option>
          ))}
        </select>
        <Button type="submit" name="Подтвердить" />
      </form>
      <Button clickHandler={denyClickHandler} name="Отклонить" />
    </>
  );
};

export default ConfirmLotForm;
