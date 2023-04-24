import React from 'react';
import './App.scss';

import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

import Timers from './components/Timers';
import Header from './components/Header';
import ContentContainer from './components/ContentContainer';
import Auctions from './pages/Auctions';
import Lots from './pages/Lots';
import Lot from './pages/Lot';
import Bids from './pages/Bids';
import Entrance from './pages/Entrance';
import { AuctionForm } from './pages/AuctionForm';
import { LotForm } from './pages/LotForm';
import UserLots from './pages/UserLots';

import { fetchUserMe } from './redux/slices/authSlice';
import LotConfirm from './pages/LotConfirm';
import { getAllLots } from './redux/slices/lotsSlice';
import Guide from './pages/Guide';
import AdminPanel from './pages/AdminPanel';
import AllResults from './pages/AllResults';

function App() {
  const location = useLocation();
  const [path, setPath] = React.useState(location.pathname);

  if (location.pathname !== path) {
    setPath(location.pathname);
  }

  const background = location.state && location.state.background;

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchUserMe());
  }, []);

  React.useEffect(() => {
    dispatch(getAllLots());
  }, [path]);

  return (
    <div className="App">
      <div className="wrapper">
        <div className="content">
          <Header />
          <Timers />
          <ContentContainer>
            <Routes location={background || location}>
              <Route path="/auctions" element={<Auctions />} />
              <Route path="/auctions/:auctionId" element={<Lots />} />
              <Route path="/auctions/:auctionId/:lotId" element={<Lot />} />
              <Route path="/auctions/:auctionId/:lotId/bids" element={<Bids />} />

              <Route path="/create-auction" element={<AuctionForm />} />
              <Route path="/add-lot" element={<LotForm />} />

              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/confirm-lot" element={<LotConfirm />} />
              <Route path="/all-results" element={<AllResults />} />

              <Route path="/my-lots" element={<UserLots />} />

              <Route path="/help" element={<Guide />} />

              <Route path="*" element={<Navigate to="/auctions" />} />
            </Routes>
            {background && (
              <Routes>
                <Route path="/login" element={<Entrance />} />
              </Routes>
            )}
          </ContentContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
