export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films',
  AddReview = '/review',
  Player = '/player',
  NotFound = '/404',
}

export enum AuthorizationStatus {
  Unknown = 'UNK',
  Authorized = 'AUTH',
  NotAuthorized = 'NO_AUTH',
}

export const BACKEND_URL = 'https://9.react.pages.academy/wtw';

export const REQUEST_TIMEOUT = 5000;

export enum HttpCode {
  Unauthorized = 403,
  NotFound = 404,
}

export enum ApiRoute {
  Films = '/films',
  Similar = '/similar',
  Promo = '/promo',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export const CARDS_PER_PAGE = 9;
