import { User, UserLoginRequest, UserLoginResponse, UserRegistrationRequest } from '../../common/types/user';

export const GET_USER_CRED_REQUEST = '@User/cred/get';
export const GET_USER_CRED_SUCCESS = '@User/cred/success';
export const GET_USER_CRED_FAILURE = '@User/cred/failure';

export const GET_USER_LOGIN_REQUEST = '@User/login/get';
export const GET_USER_LOGIN_SUCCESS = '@User/login/success';
export const GET_USER_LOGIN_FAILURE = '@User/login/failure';

export const GET_USER_REGISTRATION_REQUEST = '@User/registration/get';
export const GET_USER_REGISTRATION_SUCCESS = '@User/registration/success';
export const GET_USER_REGISTRATION_FAILURE = '@User/registration/failure';

export type GetUserCredRequest = {
  type: typeof GET_USER_CRED_REQUEST;
};

export type GetUserCredSuccess = {
  type: typeof GET_USER_CRED_SUCCESS;
  payload: User;
};

export type GetUserCredFailure = {
  type: typeof GET_USER_CRED_FAILURE;
};

export type GetUserLoginRequest = {
  type: typeof GET_USER_LOGIN_REQUEST;
  payload: UserLoginRequest
};

export type GetUserLoginSuccess = {
  type: typeof GET_USER_LOGIN_SUCCESS;
  payload: UserLoginResponse;
};

export type GetUserLoginFailure = {
  type: typeof GET_USER_LOGIN_FAILURE;
  payload: string;
};

export type GetUserRegistrationRequest = {
  type: typeof GET_USER_REGISTRATION_REQUEST;
  payload: UserRegistrationRequest
};

export type GetUserRegistrationSuccess = {
  type: typeof GET_USER_REGISTRATION_SUCCESS;
  payload: any;
};

export type GetUserRegistrationFailure = {
  type: typeof GET_USER_REGISTRATION_FAILURE;
  payload: string;
};


export type UserActions =
  | GetUserCredRequest
  | GetUserCredSuccess
  | GetUserCredFailure
  | GetUserLoginRequest
  | GetUserLoginSuccess
  | GetUserLoginFailure
  | GetUserRegistrationRequest
  | GetUserRegistrationSuccess
  | GetUserRegistrationFailure;
