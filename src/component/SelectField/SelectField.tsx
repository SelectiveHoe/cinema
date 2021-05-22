import {MenuItem} from '@material-ui/core';
import TextField, {TextFieldProps} from '@material-ui/core/TextField';
import React, {useCallback} from 'react';
import {FieldRenderProps} from 'react-final-form';
import { getFinalFormStyle } from '../FinalFormStyles';

const noop = () => {};

type FFSelectFieldProps = FieldRenderProps<string, HTMLElement> & {
  InnerInputProps?: TextFieldProps;
  required?: boolean;
};

const FFSelectField: React.FC<FFSelectFieldProps> = ({
  input,
  meta,
  items,
  required = false,
  InnerInputProps: {helperText, onChange = noop, ...rest} = {},
}: FFSelectFieldProps) => {
  const errorMessage = meta.error || meta.submitError;
  const doShowError = !!(meta.touched && errorMessage);
  const classes = getFinalFormStyle();
  const handleChange = useCallback(
    (event) => {
      input.onChange(event);
      onChange(event);
    },
    [onChange, input]
  );

  return (
    <TextField
      FormHelperTextProps={{
        className: classes.helper
      }}
      required={required}
      select
      {...input}
      onChange={handleChange}
      {...rest}
      InputLabelProps={{
        shrink: true,
      }}
      error={doShowError}
      helperText={doShowError ? errorMessage : helperText}
      variant="outlined"
      size="small"
    >
      {items &&
        items.map((option: {value: string; label: string}) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
    </TextField>
  );
};

export default FFSelectField;
