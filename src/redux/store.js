import { configureStore } from '@reduxjs/toolkit';

import accountReducer from './slice/accountSlide';
import userReducer from './slice/userSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    user: userReducer,
  },
});
