import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { callFetchAccount } from '../../service/api.auth';

// First, create the thunk
export const fetchAccount = createAsyncThunk(
  'account/fetchAccount',
  async () => {
    const response = await callFetchAccount();
    return response.data;
  }
);

const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  isLoading: true,
  isRefreshToken: false,
  errorRefreshToken: '',
  user: JSON.parse(localStorage.getItem('user')) || {
    id: '',
    email: '',
    fullname: '',
    roles: [],
  },
  activeMenu: 'home',
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
    setUserLoginInfo: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user.id = action?.payload?.id;
      state.user.email = action.payload.email;
      state.user.fullname = action.payload.fullname;
      state.user.roles = action?.payload?.roles;
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    setLogoutAction: (state) => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      state.isAuthenticated = false;
      state.user = {
        id: '',
        email: '',
        fullname: '',
        roles: [],
      };
    },
    setRefreshTokenAction: (state, action) => {
      state.isRefreshToken = action.payload?.status ?? false;
      state.errorRefreshToken = action.payload?.message ?? '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAccount.pending, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = false;
        state.isLoading = true;
      }
    });

    builder.addCase(fetchAccount.fulfilled, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user.id = action?.payload?.user?.id;
        state.user.email = action.payload.user?.email;
        state.user.fullname = action.payload.user?.fullname;
        state.user.roles = action?.payload?.user?.roles;
      }
    });

    builder.addCase(fetchAccount.rejected, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = false;
        state.isLoading = false;
      }
    });
  },
});

export const {
  setActiveMenu,
  setUserLoginInfo,
  setLogoutAction,
  setRefreshTokenAction,
} = accountSlice.actions;

export default accountSlice.reducer;
