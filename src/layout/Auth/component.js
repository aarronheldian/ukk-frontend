import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Hidden } from '@material-ui/core';
import banner from '../../assets/banner.jpeg'

const Component = props => {
  const { classes, children } = props;

  return (
    <Grid
      alignContent="center"
      alignItems="center"
      className={classes.bgWrapper}
      container
      direction="row"
      justify="center"
    >
      <Grid item lg={6}>
        <div className={classes.mainWrapper}>
          {children}
        </div>
      </Grid>
      <Hidden mdDown>
        <Grid item md={6}>
          <div className={classes.banner} style={{backgroundImage: `url(${banner})`}}/>
        </Grid>
      </Hidden>
    </Grid>
  );
};

Component.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired
};

export default Component;
