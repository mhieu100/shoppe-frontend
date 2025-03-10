import { configureStore } from '@reduxjs/toolkit';

import accountReducer from './slice/accountSlide';
import productReducer from './slice/productSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    product: productReducer,
  },
});
