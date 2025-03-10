import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { App as AntdApp } from 'antd';

import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AntdApp>
      <App />
    </AntdApp>
  </Provider>
);
