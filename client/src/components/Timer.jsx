import React from 'react';
import { useDispatch } from 'react-redux';
import { getBids } from '../redux/slices/bidSlice';
import { postLotResult } from '../redux/slices/lotItemSlice';

import { Navigate, useNavigate, useParams } from 'react-router-dom';

const Timer = ({ date, lotId, status }) => {
  const dispatch = useDispatch();
  const { auctionId } = useParams();
  const navigate = useNavigate();
  const [finishTime] = React.useState(date.getTime());
  const [[diffH, diffM, diffS], setDiff] = React.useState([0, 0, 0]);
  const [tick, setTick] = React.useState(false);
  const [isTimeout, setIsTimeout] = React.useState(false);
  const [timerId, setTimerID] = React.useState(0);

  React.useEffect(() => {
    const diff = (finishTime - new Date()) / 1000;

    if (diff < 0) {
      if (lotId && status === 'exhibited') {
        const getDataBids = async () => {
          const { payload } = await dispatch(getBids(lotId));

          if (payload.findBids.length) {
            const sortedBids = [...payload.findBids];
            sortedBids.sort((a, b) => b.amount - a.amount);
            const bidId = sortedBids[0].id;
            await dispatch(postLotResult({ lotId, bidId }));
          } else {
            await dispatch(postLotResult({ lotId, bidId: null }));
          }
        };
        getDataBids();
      }
      setIsTimeout(true);
      return;
    }
    setDiff([Math.floor(diff / 3600), Math.floor((diff / 60) % 60), Math.floor(diff % 60)]);
  }, [tick, finishTime]);

  React.useEffect(() => {
    if (isTimeout) clearInterval(timerId);
  }, [isTimeout, timerId]);

  React.useEffect(() => {
    const timerID = setInterval(() => {
      setTick(!tick);
    }, 1000);
    setTimerID(timerID);
    return () => clearInterval(timerID);
  }, [tick]);
  return (
    <>
      (
      <span>{`${diffH.toString().padStart(2, '0')}:${diffM.toString().padStart(2, '0')}:${diffS
        .toString()
        .padStart(2, '0')}`}</span>
      )
    </>
  );
};

export default Timer;
