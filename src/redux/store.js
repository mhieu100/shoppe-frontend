import { configureStore } from '@reduxjs/toolkit';

import accountReducer from './slice/accountSlide';
import userReducer from './slice/userSlice';
import categoryReducer from './slice/categorySlice';


export const store = configureStore({
  reducer: {
    account: accountReducer,
    user: userReducer,
    category: categoryReducer,

  },
});
