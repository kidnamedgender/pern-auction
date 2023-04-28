import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import cls from './allResults.module.scss';

import ErrorBlock from '../../components/ErrorBlock';
import EmptyBlock from '../../components/EmptyBlock';
import Loader from '../../components/Loader';
import Title from '../../components/Title';
import MyLotItem from '../../components/UserLotItem';

import { getAllUserLots } from '../../redux/slices/lotSlice';

const AllResults = () => {
  const [currentSortType, setCurrentSortType] = React.useState('Новые');

  const sortTypes = ['Новые', 'Старые', 'Дорогие', 'Дешевые'];

  const dispatch = useDispatch();

  const { myLots, status } = useSelector((state) => state.lotSlice);

  React.useEffect(() => {
    dispatch(getAllUserLots());
  }, []);

  const changeSortHandler = (type) => {
    setCurrentSortType(type);
  };

  const sortedLots = React.useMemo(() => {
    let arrForSort = [...myLots];
    if (currentSortType === 'Новые') {
      return arrForSort.sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
    }
    if (currentSortType === 'Старые') {
      return arrForSort.sort(
        (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      );
    }
    if (currentSortType === 'Дорогие') {
      return arrForSort.sort((a, b) => b.bid.lot.current_price - a.bid.lot.current_price);
    }
    if (currentSortType === 'Дешевые') {
      return arrForSort.sort((a, b) => a.bid.lot.current_price - b.bid.lot.current_price);
    }
  }, [myLots, currentSortType]);

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    return <ErrorBlock errText="Произошла ошибка" errType="500" />;
  }

  return (
    <div className={cls.root}>
      <Title hTitle="История сделок" />
      <div className={cls.sort__list}>
        <ul>
          {sortTypes.map((type) => (
            <li
              key={type}
              onClick={() => changeSortHandler(type)}
              className={currentSortType === type ? cls.active : ''}>
              {type}
            </li>
          ))}
        </ul>
      </div>
      {myLots.length ? (
        <div className={cls.lots__list}>
          {sortedLots.map((lot) => (
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
        <EmptyBlock title="Здесь ничего нет" image="/img/capy-where.png" />
      )}
    </div>
  );
};

export default AllResults;
