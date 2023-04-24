import React from 'react';
import cls from './auctions.module.scss';

import AuctionItem from '../../components/AuctionItem';
import Loader from '../../components/Loader/index';
import Title from '../../components/Title';

import { getAuctions } from '../../redux/slices/auctionSlice';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import EmptyBlock from '../../components/EmptyBlock';

const Auctions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auctions, status, count } = useSelector((state) => state.auctionSlice);
  const roleCheck = useSelector((state) => state.authSlice.data?.role === 'admin');
  React.useEffect(() => {
    dispatch(getAuctions());
    window.scroll(0, 0);
  }, []);

  if (status === 'pending') {
    return <Loader />;
  }

  return (
    <div className={cls.root}>
      <Title
        hTitle="Аукционы"
        bTitle="Добавить аукцион"
        role={roleCheck}
        clickHandler={() => navigate('/create-auction')}
      />
      {count.length ? (
        <div className={cls.auctions__list}>
          {auctions.map((auction) =>
            count.includes(auction.id) ? (
              <Link
                style={{ textDecoration: 'none', color: 'black' }}
                key={auction.id}
                to={`${auction.id}`}>
                <AuctionItem key={auction.id} title={auction.title} image={auction.imageURL} />
              </Link>
            ) : (
              ''
            ),
          )}
        </div>
      ) : (
        <EmptyBlock title="Активных аукционов не обнаружено." image="/img/capy-where.png" />
      )}
    </div>
  );
};

export default Auctions;
