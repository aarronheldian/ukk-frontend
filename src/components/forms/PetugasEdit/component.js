import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import TextField from '../../elements/TextField';
import Button from '@material-ui/core/Button';
import { Grid, Typography } from '@material-ui/core';

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
      <Grid container spacing={2} style={{ padding: '16px 24px' }}>
        <Grid align="center" item xs={12}>
          <Typography component="span" variant="body1">Data Petugas</Typography>
        </Grid>
        <Grid align="center" item xs={12}>
          <Typography component="span" variant="caption">Harap isi data petugas dengan benar</Typography>
        </Grid>
        <Grid item xs={12} />
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
            label="No. Telepon"
            margin="none"
            name="telp"
            id="telp"
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
          <Typography component="span" variant="caption" style={{ color: '#B3C3CA' }}>*Kosongkan Password jika tidak berubah</Typography>
        </Grid>
        <Grid align="center" item xs={12}>
          <Button
            disabled={disabled}
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
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
