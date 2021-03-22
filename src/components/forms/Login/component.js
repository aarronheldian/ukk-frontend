import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import TextField from '../../elements/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { ROUTES } from '../../../configs';

const Component = props => {

  const { handleSubmit, invalid, message, onClear, submitting } = props;
  const disabled = invalid || submitting;

  let meta = {};

  if (!invalid && message) {
    meta = { meta: { error: '', touched: true, invalid: true } };
  } else if (invalid && message) {
    onClear();
  }

  return (
    <form onSubmit={v => handleSubmit(v)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Field
            component={TextField}
            fullWidth
            label="Username"
            margin="none"
            name="username"
            id="username"
            {...meta}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            component={TextField}
            fullWidth
            label="Password"
            margin="none"
            name="password"
            type="password"
            id="password"
            {...meta}
          />
        </Grid>
        <Grid align="right" item xs={12}>
          <Link href={ROUTES.REGISTER}>
            <Typography color="primary" variant="body2">Don't have an account? Sign Up</Typography>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Button
            disabled={disabled}
            type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

Component.defaultProps = {
  invalid: false,
  message: '',
  submitting: false
};

Component.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default Component;
