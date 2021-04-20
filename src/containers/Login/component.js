import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Auth from '../../layout/Auth';
import LoginForm from '../../components/forms/Login';
import CallbackAlert from '../../components/elements/CallbackAlert'

export default function Component(props) {
  const [alert, setAlert] = useState({ content: '', success: true });

  const onSubmit = (values = {}) => {
    const payload = {
      username: values.username,
      password: values.password
    };

    props.actions.fetchLogin({payload, callback: setAlert});
  };

  const closeAlert = () => setAlert({ content: '', success: true });

  const renderAlert = (
    <CallbackAlert onClose={closeAlert} {...alert}/>
  );

  return (
    <Auth>
      <Grid container spacing={3}>
        <Grid align="center" item xs={12}>
          <img src={'https://telkomschools.sch.id/web/wp-content/uploads/2018/11/ts-footer.png'} alt="logo" />
        </Grid>
        <Grid align="center" item xs={12}>
          <Typography component="span" variant="h5">Welcome to UKK Moklet!</Typography>
        </Grid>
        <Grid align="center" item xs={12}>
          <Typography component="span" variant="subtitle1">Type your details below</Typography>
        </Grid>
        <Grid align="center" item xs={12}>
          <br/>
          <LoginForm
            onSubmit={onSubmit}
          />
        </Grid>
      </Grid>
      {renderAlert}
    </Auth>
  );
}