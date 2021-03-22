import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ReportIcon from '@material-ui/icons/Report';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';

const Component = props => {
  const { classes, active, type } = props;

  const iconProps = { className: classnames(classes.icon, { [classes.iconActive]: active }) };

  switch (type) {
    case 'pengaduan': {
      return <ReportIcon {...iconProps} />;
    }
    case 'petugas': {
      return <PersonIcon {...iconProps} />;
    }
    case 'masyarakat': {
      return <GroupIcon {...iconProps} />;
    }
    default: {
      return <PersonIcon {...iconProps} />;
    }
  }
};

Component.defaultProps = {
  active: false,
  type: '',
};

Component.propTypes = {
  active: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  type: PropTypes.string,
};

export default Component;
