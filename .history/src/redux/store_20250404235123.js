import { configureStore } from '@reduxjs/toolkit';

import accountReducer from './slice/accountSlide';
import productReducer from './slice/productSlice';
import userReducer from './slice/userSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    product: productReducer,
    user: userReducer,
  },
});
