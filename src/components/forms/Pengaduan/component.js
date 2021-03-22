import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import TextField from '../../elements/TextField';
import CallbackAlert from '../../elements/CallbackAlert';
import { textLimit } from '../../../utils/text';
import { Grid, Typography, IconButton, Button } from '@material-ui/core';
import { AddAPhotoOutlined } from '@material-ui/icons';

const Component = props => {
  const [alert, setAlert] = useState('')
  const [photo, setPhoto] = useState(null)

  const { handleSubmit, invalid, message, onClear, submitting, rest, onSubmit } = props;

  let validationPhoto = Boolean(photo);
  const disabled = invalid || submitting || !validationPhoto;

  let meta = {};

  if (!invalid && message) {
    meta = { meta: { error: '', touched: true, invalid: true } };
  } else if (invalid && message) {
    onClear();
  }

  const handleOnSubmit = values => {;
    onSubmit({ ...values, photo });
  };
  
  const handleSetPhoto = photo => {
    setPhoto(photo)
  };

  const handleChange = ({ target: { files } }) => {
    const { size } = files[0];

    if (size > 512000) {
      setAlert(`File Maksimal Berukuran 500 KB`);
    } else {
      handleSetPhoto(files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <Grid container spacing={2} style={{ padding: '16px 24px' }}>
        <Grid align="center" item xs={12}>
          <Typography component="span" variant="body1">Data Pengaduan</Typography>
        </Grid>
        <Grid align="center" item xs={12}>
          <Typography component="span" variant="caption">Harap isi data pengaduan dengan benar</Typography>
        </Grid>
        <Grid item xs={12} />
        <Grid item xs={12}>
          <Field
            component={TextField}
            fullWidth
            label="Judul"
            margin="none"
            name="title"
            id="title"
            {...meta}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            component={TextField}
            fullWidth
            multiline={true}
            rows={4}
            type="text"
            label="Deskripsi"
            margin="none"
            name="description"
            id="description"
            placeholder="Mohon Deskripsikan Permasalahan.."
            {...meta}
          />
        </Grid>
        <Grid item xs={2}>
          <div>
            <IconButton color="primary" aria-label="photo" component="label">
              <input
                accept="image/*"
                hidden
                id="photo"
                onChange={handleChange}
                type="file"
                {...rest}
              />
              <AddAPhotoOutlined />
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={10}>
          <div style={{ marginTop: 15 }}>
            <Typography component="span" variant="body2">{photo ? textLimit(photo.name, 30) : 'Upload Image, max 500 KB'}</Typography>
          </div>
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
      <CallbackAlert content={alert} onClose={() => setAlert('')} />
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
