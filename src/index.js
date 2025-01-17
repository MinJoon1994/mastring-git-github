import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'
import App from './App';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* BrowserRouter 브라우저의 주소 변경을 감지하는 기능 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

