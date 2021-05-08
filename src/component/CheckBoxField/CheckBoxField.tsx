import { Checkbox, Typography } from '@material-ui/core';
import {TextFieldProps} from '@material-ui/core/TextField';
import React, {useCallback} from 'react';
import {FieldRenderProps} from 'react-final-form';
import {getFinalFormStyle} from '../FinalFormStyles';

const noop = () => {};

export type FFTextFieldProps = FieldRenderProps<string, HTMLElement> & {
  InnerInputProps?: TextFieldProps;
  required?: boolean;
  isCurrent?: boolean;
};

const CheckBoxField: React.ComponentType<FieldRenderProps<string, HTMLElement>> = ({
  input,
  meta,
  toUpperCase = false,
  required = false,
  InnerInputProps: {onChange = noop, ...rest} = {},
}: FFTextFieldProps) => {
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
    <div className={classes.checkBox}>
      <Checkbox onChange={handleChange} color='primary'/>
      <Typography>
        {rest.label}
      </Typography>
    </div>
  );
};

export default CheckBoxField;
