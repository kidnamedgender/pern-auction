import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import store from './redux/store.js';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </Router>
  </Provider>,
);
