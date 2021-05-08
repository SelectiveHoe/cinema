import { User, UserLoginRequest, UserLoginResponse, UserRegistrationRequest } from '../../common/types/user';
import {
  GET_USER_CRED_REQUEST,
  GET_USER_CRED_SUCCESS,
  GET_USER_CRED_FAILURE,
  GET_USER_LOGIN_REQUEST,
  GET_USER_LOGIN_SUCCESS,
  GET_USER_LOGIN_FAILURE,
  GET_USER_REGISTRATION_REQUEST,
  GET_USER_REGISTRATION_SUCCESS,
  GET_USER_REGISTRATION_FAILURE,
  GetUserRegistrationRequest,
  GetUserRegistrationSuccess,
  GetUserRegistrationFailure,
  GetUserCredRequest,
  GetUserCredSuccess,
  GetUserCredFailure,
  GetUserLoginRequest,
  GetUserLoginSuccess,
  GetUserLoginFailure,
} from './types';

export const getUserCredRequest = (): GetUserCredRequest => ({
  type: GET_USER_CRED_REQUEST,
});

export const getUserCredSuccess = (payload: User): GetUserCredSuccess => ({
  type: GET_USER_CRED_SUCCESS,
  payload,
});

export const getUserCredFailure = (): GetUserCredFailure => ({
  type: GET_USER_CRED_FAILURE,
});

export const getUserLoginRequest = (payload: UserLoginRequest): GetUserLoginRequest => ({
  type: GET_USER_LOGIN_REQUEST,
  payload,
});

export const getUserLoginSuccess = (payload: UserLoginResponse): GetUserLoginSuccess => ({
  type: GET_USER_LOGIN_SUCCESS,
  payload,
});

export const getUserLoginFailure = (payload: string): GetUserLoginFailure => ({
  type: GET_USER_LOGIN_FAILURE,
  payload
});

export const getUserRegistrationRequest = (payload: UserRegistrationRequest): GetUserRegistrationRequest => ({
  type: GET_USER_REGISTRATION_REQUEST,
  payload,
});

export const getUserRegistrationSuccess = (payload: any): GetUserRegistrationSuccess => ({
  type: GET_USER_REGISTRATION_SUCCESS,
  payload,
});

export const getUserRegistrationFailure = (payload: string): GetUserRegistrationFailure => ({
  type: GET_USER_REGISTRATION_FAILURE,
  payload
});