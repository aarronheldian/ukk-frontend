import React from 'react';
import Proptypes from 'prop-types';
import Dialog from '../Dialog';
import { Grid, Button, Typography } from '@material-ui/core';

const Component = props => {
  const { classes, content, secondaryContent, onClose, actions, vertical, title } = props;

  const isVerticalGrid = actions.length >= 3 || vertical;

  const buttonHandler = index => {
    if (isVerticalGrid) {
      return index === 0 ? 'contained' : 'outlined';
    } else {
      return index === actions.length - 1 ? 'contained' : 'outlined';
    }
  };

  return Boolean(content || title) && (
    <Dialog
      customWidth={classes.root}
      maxWidth=""
      onClose={onClose}
      open={Boolean(content || title)}
    >
      <Grid className={classes.contentRoot} container spacing={1}>
        <Grid align="center" className={classes.title} item xs={12}>
          <Typography variant="subtitle2">{title}</Typography>
        </Grid>
        <Grid align="center" item xs={12}>
          <Typography className={classes.content} variant="body1">{content}</Typography>
          {secondaryContent && (
            <div>
              <Typography variant="caption">{secondaryContent}</Typography><br/>
            </div>
          )}
        </Grid>
        <Grid align="center" item xs={12}>
          <Grid container justify="center" spacing={1} style={{ paddingTop: 8 }}>
            {actions.map(({ label, action }, index) => (
              <Grid
                align="center"
                className={isVerticalGrid >= 3 ? classes.verticalButton : classes.horizontalButton}
                item
                key={label}
                xs={isVerticalGrid ? 12 : 'auto'}
              >
                <Button
                  onClick={action}
                  variant={buttonHandler(index)}
                  color="primary"
                >
                  {label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};

Component.defaultProps = {
  content: '',
  secondaryContent: '',
  title: '',
  vertical: false
};

Component.propTypes = {
  actions: Proptypes.array.isRequired,
  classes: Proptypes.object.isRequired,
  content: Proptypes.string,
  onClose: Proptypes.func.isRequired,
  secondaryContent: Proptypes.string,
  title: Proptypes.string,
  vertical: Proptypes.bool
};

export default Component;
