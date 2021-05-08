import {call, delay, put, takeLatest} from 'redux-saga/effects';
import * as Actions from './actions';
import Api from '../../services/api';
import {
  GetUserCredRequest,
  GetUserLoginRequest,
  GetUserRegistrationRequest,
  GET_USER_CRED_REQUEST,
  GET_USER_LOGIN_REQUEST,
  GET_USER_REGISTRATION_REQUEST,
} from './types';
import { ApiResponse } from '../../common/types/apiResponse';
import { User, UserLoginResponse } from '../../common/types/user';


export function* getUserCred(action: GetUserCredRequest) {
  try {
    const response: ApiResponse<User> = yield call(Api.doCred);
    if (response.success) {
      yield put(Actions.getUserCredSuccess(response.data));
    } else {
      yield put(Actions.getUserCredFailure());
    }
  } catch (error) {
    yield put(Actions.getUserCredFailure());
  }
}

export function* getUserLogin(action: GetUserLoginRequest) {
  yield delay(1000);
  try {
    const response: ApiResponse<UserLoginResponse> = yield call(Api.doLogin, action.payload);
    if (response.success) {
      yield put(Actions.getUserLoginSuccess(response.data));
      yield put(Actions.getUserCredRequest())
    }
    // yield put(
    //   enqueueSnackbar({
    //     message: 'Request was successfully sent.',
    //     variant: 'success',
    //   })
    // );
  } catch (error) {
    yield put(Actions.getUserLoginFailure(error.response.data.detail));
    // yield put(
    //   enqueueSnackbar({
    //     message: error.response.data.message,
    //     variant: 'error',
    //   })
    // );
  }
}

export function* getUserRegistration(action: GetUserRegistrationRequest) {
  try {
    const response: ApiResponse<any> = yield call(Api.doRegistration, action.payload);
    if (response.success) {
      yield put(Actions.getUserRegistrationSuccess(response.data));
      action.payload.history.push('/login');
    }
  } catch (error) {
    const errorStr = Object.values(error.response.data).join('. ');
    yield put(Actions.getUserRegistrationFailure(errorStr));
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  takeLatest(GET_USER_CRED_REQUEST, getUserCred),
  takeLatest(GET_USER_LOGIN_REQUEST, getUserLogin),
  takeLatest(GET_USER_REGISTRATION_REQUEST, getUserRegistration),
];
