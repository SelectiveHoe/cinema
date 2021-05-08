import { User } from '../../../common/types/user';
import {
  UserActions,
  GET_USER_CRED_REQUEST,
  GET_USER_CRED_SUCCESS,
  GET_USER_CRED_FAILURE,
  GET_USER_LOGIN_REQUEST,
  GET_USER_LOGIN_SUCCESS,
  GET_USER_LOGIN_FAILURE,
  GET_USER_REGISTRATION_REQUEST,
  GET_USER_REGISTRATION_SUCCESS,
  GET_USER_REGISTRATION_FAILURE,
} from '../types';

export type State = {
  currUser: User | null,
  isLoading: boolean,
  isGetUserCredLoading: boolean,
  registrationResponseMessage: string,
  responseMessage: string,
};

const initialState: State = {
  registrationResponseMessage: '',
  currUser: null,
  isGetUserCredLoading: false,
  isLoading: false,
  responseMessage: '',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state: State = initialState,
  action: UserActions,
): State => {
  switch (action.type) {
    case GET_USER_REGISTRATION_REQUEST: 
      return {...state, isLoading: true}
    case GET_USER_REGISTRATION_SUCCESS: 
      return {...state, isLoading: false, 
        responseMessage: 'User created successfully. Use login or email and password to log-in.', 
        registrationResponseMessage: '',
      }
    case GET_USER_REGISTRATION_FAILURE:
      return {...state, isLoading: false, 
        registrationResponseMessage: action.payload,
      } 
    case GET_USER_CRED_REQUEST:
      return {...state, isGetUserCredLoading: true}
    case GET_USER_CRED_SUCCESS:
      return {...state, 
        isGetUserCredLoading: false,
        currUser: action.payload,
      }
    case GET_USER_CRED_FAILURE:
      return {...state, isGetUserCredLoading: false}
    case GET_USER_LOGIN_REQUEST: 
      return {...state, isLoading: true, responseMessage: ''}
      case GET_USER_LOGIN_SUCCESS:
        localStorage.setItem('accessToken', action.payload.Token)
      return {...state, 
        isLoading: false,
      }
      case GET_USER_LOGIN_FAILURE: 
      return {...state, 
        isLoading: false,
        responseMessage: action.payload,
      }
    default:
      return state;
  }
};
