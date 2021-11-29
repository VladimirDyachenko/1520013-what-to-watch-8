import { createSelector } from 'reselect';
import { Store } from '../../types/store/store';
import { AuthorizationStatus } from '../../utils/const';
import { NameSpace } from '../root-reducer';

export const getAuthorizationStatus = (state: Store): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

export const getIsAuthorized = createSelector(
  getAuthorizationStatus,
  (authStatus): boolean => authStatus === AuthorizationStatus.Authorized,
);
