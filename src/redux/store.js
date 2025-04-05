import { configureStore } from '@reduxjs/toolkit';

import accountReducer from './slice/accountSlide';
import categoryReducer from './slice/categorySlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    category: categoryReducer,
  },
});
