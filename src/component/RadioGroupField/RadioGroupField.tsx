import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
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
      <RadioGroup name="range" onChange={handleChange} className={classes.radioContainer}>
        <FormControlLabel value="short" control={<Radio color="primary"/>} label="from ... to 60 minutes (Short)"/>
        
        <FormControlLabel value="middle" control={<Radio color="primary"/>} label="from 60 to 150 minutes (Normal)"/>
        
        <FormControlLabel value="long" control={<Radio color="primary"/>} label="from 150 to ... minutes (Long)"/>
      </RadioGroup>
    </div>
  );
};

export default CheckBoxField;
