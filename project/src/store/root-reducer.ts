import { combineReducers } from 'redux';
import { dataProcess } from './data-process/data-process';
import { userProcess } from './user-process/user-process';

export enum NameSpace {
  Data = 'DATA',
  User = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess,
  [NameSpace.Data]: dataProcess,
});

export type RootState = ReturnType<typeof rootReducer>;
