import React from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';


const Component = props => {
  const {
    classes,
    meta: { touched, invalid, error },
    label,
    id,
    input,
    disabled,
    InputProps,
    InputLabelProps,
    multiline,
    rows,
    ...rest
  } = props;

  const isError = touched && invalid;

  return (
    <TextField
      {...rest}
      {...input}
      disabled={disabled}
      error={isError}
      FormHelperTextProps={{
        classes: {
          error: classes.helperError
        }
      }}
      fullWidth
      helperText={isError ? error : ''}
      id={id}
      InputLabelProps={{
        ...InputLabelProps,
        classes: {
          root: classes.labelRoot,
          focused: classes.labelFocused,
          disabled: classes.labelDisabled,
          error: classes.labelxError,
          shrink: classes.labelShrink,
        }
      }}
      InputProps={{
        ...InputProps,
        classes: {
          root: classes.inputRoot,
          disabled: classes.inputDisabled,
        }
      }}
      label={label}
      multiline={multiline}
      rows={rows}
      variant="outlined"
    />
  );
};

Component.defaultProps = {
  disabled: false,
  id: 'text-field',
  InputLabelProps: {},
  InputProps: {},
  label: '',
  meta: { touched: false, invalid: false, error: '' },
  multiline: false,
  rows: 0,
};


Component.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  input: PropTypes.object.isRequired,
  InputLabelProps: PropTypes.object,
  InputProps: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
};

export default Component;
