import React from 'react';
import cls from './bids.module.scss';

import Loader from '../../components/Loader';
import BidItem from '../../components/BidItem';

import ErrorBlock from '../../components/ErrorBlock';

import { getBids } from '../../redux/slices/bidSlice';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../../components/Title';
import EmptyBlock from '../../components/EmptyBlock';

const Bids = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bids, status, lotTitle } = useSelector((state) => state.bidSlice);
  const { lotId } = useParams();

  React.useEffect(() => {
    dispatch(getBids(lotId));
    window.scroll(0, 0);
  }, []);

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    return <ErrorBlock errText="Не удалось найти историю ставок данного лота." errType="404" />;
  }

  return (
    <div className={cls.root}>
      <Title hTitle="История ставок на" sTitle={lotTitle} />
      {bids.length ? (
        <ul className={cls.bid__list}>
          {bids.map((bid) => (
            <BidItem key={bid.id} user={bid.user.name} amount={bid.amount} />
          ))}
        </ul>
      ) : (
        <EmptyBlock title="Ставок на данный лот не обнаружено." image="/img/capy-where.png" />
      )}
    </div>
  );
};

export default Bids;
