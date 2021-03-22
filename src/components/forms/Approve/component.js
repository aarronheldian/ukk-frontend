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
          <Typography component="span" variant="body1">Sebelum Menyelesaikan Permasalahan ini, Mohon isikan Note</Typography>
        </Grid>
        <Grid align="center" item xs={12}>
          <Typography component="span" variant="caption">Masyarakat bisa melihat note di kolom</Typography>
        </Grid>
        <Grid item xs={12} />
        <Grid item xs={12}>
          <Field
            component={TextField}
            fullWidth
            multiline={true}
            rows={4}
            type="text"
            label="Note"
            margin="none"
            name="note"
            id="note"
            placeholder="Mohon Isikan Note.."
            {...meta}
          />
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
