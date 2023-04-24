import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cls from './lotConfirm.module.scss';
import { getAuctions } from '../../redux/slices/auctionSlice';
import Loader from '../../components/Loader';

import Title from '../../components/Title';
import EmptyBlock from '../../components/EmptyBlock';

import { useNavigate } from 'react-router-dom';

import PendingLotItem from '../../components/PendingLotItem';
const LotConfirm = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { allLots, status } = useSelector((state) => state.lotsSlice);
  React.useEffect(() => {
    dispatch(getAuctions());
    window.scroll(0, 0);
  }, []);

  if (status === 'pending') {
    return <Loader />;
  }

  return (
    <div className={cls.root}>
      <Title hTitle="Ожидают подтверждения" />
      {allLots.length && allLots.some((lot) => lot.status === 'pending') ? (
        <div className={cls.lots__list}>
          {allLots.map((lot) =>
            lot.status === 'pending' ? (
              <PendingLotItem
                key={lot.id}
                id={lot.id}
                title={lot.title}
                currentBid={lot.current_price}
                image={lot.imageURL}
                user={lot.user.name}
                date={new Date(lot.end_date)}
                status={lot.status}
                desc={lot.desc}
              />
            ) : (
              ''
            ),
          )}
        </div>
      ) : (
        <EmptyBlock
          title="Хорошая работа! Ожидающих лотов не обнаружено."
          image="/img/capy-like.png"
        />
      )}
    </div>
  );
};

export default LotConfirm;
