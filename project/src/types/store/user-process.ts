import { AuthorizationStatus } from '../../utils/const';
import { AuthInfo } from '../user';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  userData: AuthInfo | undefined,
};
