import TextField, {TextFieldProps} from '@material-ui/core/TextField';
import React, {useCallback} from 'react';
import {FieldRenderProps} from 'react-final-form';
import { getFinalFormStyle } from '../FinalFormStyles';

const noop = () => {};

export type FFTextFieldProps = FieldRenderProps<string, HTMLElement> & {
  InnerInputProps?: TextFieldProps;
  required?: boolean;
  isCurrent?: boolean;
};

const FFTextField: React.FC<FFTextFieldProps> = ({
  input,
  meta,
  toUpperCase = false,
  required = false,
  InnerInputProps: {helperText, onChange = noop, multiline, ...rest} = {},
}: FFTextFieldProps) => {
  const errorMessage = meta.error || meta.submitError;
  const doShowError = !!(meta.touched && errorMessage);
  const classes = getFinalFormStyle();

  const handleChange = useCallback(
    (event) => {
      if (toUpperCase) {
        event.target.value = event.target.value.toUpperCase();
      }
      input.onChange(event);
      onChange(event);
    },
    [onChange, input, toUpperCase]
  );

  return (
    <TextField
      FormHelperTextProps={{
        className: classes.helper
      }}
      required={required}
      {...input}
      onChange={handleChange}
      {...rest}
      error={doShowError}
      InputLabelProps={{
        shrink: true,
      }}
      helperText={doShowError ? errorMessage : helperText}
      multiline={multiline}
    />
  );
};

export default FFTextField;
