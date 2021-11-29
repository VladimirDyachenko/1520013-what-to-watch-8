import { createReducer } from '@reduxjs/toolkit';
import { UserProcess } from '../../types/store/user-process';
import { AuthorizationStatus } from '../../utils/const';
import { setAuthorizationStatus, setUserData } from '../action';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: undefined,
};

const userProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    });
});

export { userProcess };
