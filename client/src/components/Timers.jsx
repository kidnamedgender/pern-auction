import React from 'react';
import Timer from './Timer';
import { useSelector } from 'react-redux';
const Timers = () => {
  const { allLots } = useSelector((state) => state.lotsSlice);
  return (
    <div style={{ display: 'none' }}>
      {allLots.map((lot) =>
        lot.status === 'exhibited' ? (
          <Timer key={lot.id} date={new Date(lot.end_date)} status={lot.status} lotId={lot.id} />
        ) : (
          ''
        ),
      )}
    </div>
  );
};

export default Timers;
