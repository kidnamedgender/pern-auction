import React from 'react';
import cls from './lot.module.scss';

import Timer from '../../components/Timer';
import Loader from '../../components/Loader';
import BidForm from '../../components/BidForm';
import HrefButton from '../../UI/HrefButton';

import { getLotItem } from '../../redux/slices/lotItemSlice';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorBlock from '../../components/ErrorBlock';

const Lot = () => {
  const dispatch = useDispatch();
  const { lotItem, status } = useSelector((state) => state.lotItemSlice);
  const navigate = useNavigate();
  const { lotId } = useParams();

  React.useEffect(() => {
    dispatch(getLotItem(lotId));
    window.scroll(0, 0);
  }, []);

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    return <ErrorBlock errText="Не удалось найти данный лот." errType="404" />;
  }

  return (
    <div className={cls.root}>
      <div className={cls.basic__information}>
        <div className={cls.image__border}>
          <div className={cls.image__section}>
            <div className={cls.image}>
              <img src={lotItem.imageURL} alt="lot-image" />
            </div>
          </div>
        </div>
        <div className={cls.inf__section}>
          <div className={cls.title}>
            <h1>{lotItem.title}</h1>
            <HrefButton title="Назад" clickHandler={() => navigate(-1)} />
          </div>
          <ul className={cls.summary}>
            <li>
              Продавец: <HrefButton title={lotItem.username} />
            </li>
            <li>
              Времени осталось: <Timer date={new Date(lotItem.end_date)} />
            </li>
            <li>
              Ставки:{' '}
              <HrefButton
                title={`${lotItem.bidCount} ставок`}
                clickHandler={() => navigate('bids')}
              />
            </li>
          </ul>
          <BidForm current_price={lotItem.current_price} currentLotId={lotItem.id} />
        </div>
      </div>
      <div className={cls.description}>
        <div className={cls.desc__title}>
          <h2>Описание</h2>
        </div>
        <div className={cls.text}>
          <p>{lotItem.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default Lot;
