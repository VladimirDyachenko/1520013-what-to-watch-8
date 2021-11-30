import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Store } from './store';

export enum ActionType {
  SetAuthorization = 'user/SetAuthorization',
  SetUserData = 'user/SetUserData',
  SetFilmData = 'data/SetFilmData',
  SetSelectedGenre = 'data/SetSelectedGenre',
  SetFavoriteFilms = 'data/SetFavoriteFilms',
  SetDataLoaded = 'data/SetDataLoaded',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, Store, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<Store, AxiosInstance, Action>;
