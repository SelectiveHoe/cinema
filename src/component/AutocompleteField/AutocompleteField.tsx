import TextField, {TextFieldProps} from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, {useCallback} from 'react';
import {FieldRenderProps} from 'react-final-form';
import { getFinalFormStyle } from '../FinalFormStyles';

const noop = () => {};

type FFSelectFieldProps = FieldRenderProps<string, HTMLElement> & {
  items: any;
  freeSoloEnable?: boolean;
  getOptionLabel?: any;
  InnerInputProps?: TextFieldProps;
};

const FFAutocompleteField: React.FC<FFSelectFieldProps> = ({
  input,
  meta,
  items,
  freeSoloEnable = false,
  getOptionLabel = (option: any) => option.name,
  InnerInputProps: {helperText, onChange = noop, className, fullWidth, multiline, disabled, defaultValue, ...rest} = {},
}: FFSelectFieldProps) => {
  const errorMessage = meta.error || meta.submitError;
  const doShowError = !!(errorMessage);
  const classes = getFinalFormStyle();
  const handleChange = useCallback(
    (event, values) => {
      input.onChange(values);
      onChange(values);
    },
    [onChange, input]
  );

  return (
    <Autocomplete
    multiple
    freeSolo={freeSoloEnable}
    options={items}
    className={className}
    disabled={disabled}
    fullWidth={fullWidth}
    defaultValue={defaultValue as any}
    onChange={handleChange}
    getOptionLabel={getOptionLabel}
    renderInput={(params) => (
      <TextField
        FormHelperTextProps={{
          className: classes.helper
        }}
        {...params}
        {...rest}
        error={doShowError}
        helperText={doShowError ? errorMessage : helperText}
      />
    )}
  />
  );
};

export default FFAutocompleteField;