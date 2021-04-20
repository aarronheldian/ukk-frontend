import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import NavIcon from '../NavIcon';

const Component = props => {
  const { classes, collapse, active, label, path, icon } = props;

  const [show, setShow] = useState(true);

  useEffect(() => {
    if (collapse) {
      setShow(true);
    } else {
      setTimeout(() => setShow(false), 100);
    }
  }, [collapse]);

  const rootStyles = {
    className: classnames(classes.root, {
      [classes.active] : active,
    })
  };

  return (
    <Link className={classes.link} to={path}>
      <div {...rootStyles}>
        <div className={classes.icon}>
          <NavIcon active={active} type={icon} />
        </div>
        {!show && (
          <div className={classes.label}>
            <Typography component='span' className={classnames(classes.text, {[classes.textActive] : active})} variant="button">{label}</Typography>
          </div>
        )}
      </div>
    </Link>
  );
};

Component.defaultProps = {
  active: false,
  icon: '',
  path: '/'
};

Component.propTypes = {
  active: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  collapse: PropTypes.bool.isRequired,
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
  path: PropTypes.string
};

export default Component;
