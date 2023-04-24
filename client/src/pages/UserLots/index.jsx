import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EmptyBlock from '../../components/EmptyBlock';
import ErrorBlock from '../../components/ErrorBlock';
import Loader from '../../components/Loader';
import MyLotItem from '../../components/UserLotItem';
import Title from '../../components/Title';
import { getUserLots } from '../../redux/slices/lotSlice';
import cls from './userLots.module.scss';

const UserLots = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { myLots, status } = useSelector((state) => state.lotSlice);
  const { data } = useSelector((state) => state.authSlice);
  React.useEffect(() => {
    dispatch(getUserLots());
    console.log(myLots);
  }, []);
  if (status === 'pending') {
    return <Loader />;
  }

  if (!data) {
    return <ErrorBlock errText="Вы не авторизированы." errType="403" />;
  }
  return (
    <div className={cls.root}>
      <Title hTitle="Купленные лоты" sTitle={`${data.name + ' ' + data.surname}`} />
      {myLots.length ? (
        <div className={cls.lots__list}>
          {myLots.map((lot) => (
            <MyLotItem
              key={lot.id}
              title={lot.bid.lot.title}
              image={lot.bid.lot.imageURL}
              currentBid={lot.bid.lot.current_price}
              seller={lot.bid.lot.user.name}
              buyer={lot.bid.user.name}
              sellDate={lot.updatedAt}
            />
          ))}
        </div>
      ) : (
        <EmptyBlock title="Похоже, вы еще ничего не купили." image="/img/capy-where.png" />
      )}
    </div>
  );
};

export default UserLots;
