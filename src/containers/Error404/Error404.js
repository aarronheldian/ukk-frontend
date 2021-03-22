import React from 'react';
import { Grid, Typography, Link } from '@material-ui/core';
import { getPathRedirect } from '../../utils/common';

export default function Component() {
  return (
    <Grid item>
      <Typography variant="body2">PAGE NOT FOUND - 404</Typography>
      <Link href={getPathRedirect()}>
        <Typography color="primary" variant="body2">Back To Home</Typography>
      </Link>
    </Grid>
  );
}