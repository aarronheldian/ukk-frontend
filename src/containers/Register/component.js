import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Auth from '../../layout/Auth';
import RegisterForm from '../../components/forms/Register';
import CallbackAlert from '../../components/elements/CallbackAlert'

export default function Component(props) {
  const [alert, setAlert] = useState({ content: '', success: true });

  const onSubmit = (values = {}) => {
    const payload = {
      nik: values.nik,
      name: values.name,
      username: values.username,
      password: values.password
    };

    props.actions.registerMasyarakat({payload, callback: setAlert})
  };

  const closeAlert = () => setAlert({ content: '', success: true });

  const renderAlert = (
    <CallbackAlert onClose={closeAlert} {...alert}/>
  );

  return (
    <>
      <Auth>
        <Grid container spacing={3}>
          <Grid align="center" item xs={12}>
            <img src={'https://telkomschools.sch.id/web/wp-content/uploads/2018/11/ts-footer.png'} alt="logo" />
          </Grid>
          <Grid align="center" item xs={12}>
            <Typography component="span" variant="h5">Type your details below</Typography>
          </Grid>
          <Grid align="center" item xs={12}>
            <Typography component="span" variant="subtitle1">Please fill in this form correctly</Typography>
          </Grid>
          <Grid align="center" item xs={12}>
            <br/>
            <RegisterForm
              onSubmit={onSubmit}
            />
          </Grid>
          {renderAlert}
        </Grid>
      </Auth>
    </>
  );
}
