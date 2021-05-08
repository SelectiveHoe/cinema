export type ApiResponse<DataT = any> =
  | ApiResponseSuccess<DataT>
  | ApiResponseError;

  export type ApiResponseError =
  | ApiResponseGeneralError
  | ApiResponseValidationError;

  export type ApiResponseSuccess<T = any> = {
    success: true;
    data: T;
  };

  export type ApiResponseGeneralError = {
    success: false;
    error: GeneralApiError;
  };

  export type ApiResponseValidationError = {
    success: false;
    error: ApiErrorValidation;
  };

  export type GeneralApiError = {
    type: ErrorType.Error;
    details: any;
  };

  type ApiErrorValidation = {
    type: ErrorType.ValidationError;
    details: Array<{
      message: string;
    }>;
  };

  export enum ErrorType {
    Error = 'error',
    ValidationError = 'validation_error',
  }