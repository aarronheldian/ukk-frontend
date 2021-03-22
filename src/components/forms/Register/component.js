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
        <Grid item xs={4}>
          <Field
            component={TextField}
            fullWidth
            label="NIK"
            margin="none"
            name="nik"
            id="nik"
            {...meta}
          />
        </Grid>
        <Grid item xs={8}>
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
            label="Name"
            margin="none"
            name="name"
            id="name"
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
          <Link href={ROUTES.LOGIN}>
            <Typography color="primary" variant="body2">Have an account? Log in</Typography>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Button
            disabled={disabled}
            type="submit"
            variant="contained"
            color="primary"
          >
            Register
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
