import React, { Fragment } from 'react';
import Proptypes from 'prop-types';
import Dialog from '../Dialog';
import { HighlightOff } from '@material-ui/icons';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';

const Component = props => {
  const { classes, content, onClose, isLoading, success, subContent, title } = props;

  return (Boolean(content || title) || isLoading) && (
    <Dialog
      customWidth={classes.root}
      disableClose={isLoading}
      maxWidth=""
      onClose={onClose}
      open={Boolean(content || title) || isLoading}
    >
      <div style={{ textAlign: 'center', padding: '0 24px' }}>
        {isLoading ? (
          <CircularProgress size={50} style={{ margin: 28 }} thickness={4} />
        ) : (
          <Fragment>
            {success ? <CheckCircleOutlineIcon className={classes.icon} />
              : <HighlightOff className={classes.iconFail} />}
          </Fragment>
        )}
        <br />
        <Typography component="span" color="grey" variant="subtitle2">
          {title}
        </Typography>
        <Typography component="span" color="grey" variant="body1">
          {isLoading && 'Please Wait'}
          {content}
        </Typography><br />
        {!isLoading && subContent && <Typography component="span" color="grey" variant="caption">{subContent}<br /></Typography>}
        <br />
        <Button
          disabled={isLoading}
          onClick={onClose}
          variant="contained"
          color="primary"
        >
          OKAY
        </Button>
      </div>
    </Dialog>
  );
};

Component.defaultProps = {
  content: '',
  isLoading: true,
  subContent: '',
  success: false,
  title: '',
};

Component.propTypes = {
  classes: Proptypes.object.isRequired,
  content: Proptypes.string,
  isLoading: Proptypes.bool,
  onClose: Proptypes.func.isRequired,
  subContent: Proptypes.string,
  success: Proptypes.bool,
  title: Proptypes.string,
};

export default Component;
