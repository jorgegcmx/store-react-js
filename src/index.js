import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';
import App from './App';

import { SalesContextProvider } from './components/Contex/SalesContext'
import SendPay from './SendPay';
import Pay from './Pay';

ReactDOM.render(
  <>
    <HashRouter>
      <SalesContextProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/sendpay" element={<SendPay/>} />
          <Route path="/pay" element={<Pay/>} />         
        </Routes>
      </SalesContextProvider>
    </HashRouter>
  </>,
  document.getElementById('root')
);


