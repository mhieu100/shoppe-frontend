import { configureStore } from '@reduxjs/toolkit';

import accountReducer from './slice/accountSlide';
import productReducer from './slice/productSlice';
import userReducer from './slice/userSlice';
import reviewReducer from './slice/reviewSlice';
import orderReducer from './slice/orderSlice'; 
import discountReducer from './slice/discountSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    product: productReducer,
    user: userReducer,
    review: reviewReducer,
    order: orderReducer, // Add this line
    discount: discountReducer, // Add this line
  },
});
