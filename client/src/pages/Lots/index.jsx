import React from 'react';
import cls from './lots.module.scss';
import LotItem from '../../components/LotItem';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getLots } from '../../redux/slices/lotSlice';
import Loader from '../../components/Loader';
import Title from '../../components/Title';
import ErrorBlock from '../../components/ErrorBlock';
import EmptyBlock from '../../components/EmptyBlock';

const Lots = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lots, status, auctionTitle } = useSelector((state) => state.lotSlice);

  const { auctionId } = useParams();

  React.useEffect(() => {
    dispatch(getLots(auctionId));
    window.scroll(0, 0);
  }, []);

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    return <ErrorBlock errType="404" errText="Не удалось найти данный аукцион." />;
  }

  return (
    <div className={cls.root}>
      <Title hTitle="Аукцион" sTitle={auctionTitle} />
      {lots.length ? (
        <div className={cls.lots__list}>
          {lots.map((lot) => (
            <LotItem
              key={lot.id}
              id={lot.id}
              title={lot.title}
              currentBid={lot.current_price}
              image={lot.imageURL}
              user={lot.user.name}
              date={new Date(lot.end_date)}
              status={lot.status}
            />
          ))}
        </div>
      ) : (
        <EmptyBlock
          title="Активных лотов данного аукциона не обнаружено."
          image="/img/capy-where.png"
        />
      )}
    </div>
  );
};

export default Lots;
