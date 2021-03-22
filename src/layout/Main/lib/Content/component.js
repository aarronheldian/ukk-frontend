import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Component = props => {
  const { classes, children, collapse } = props;
  return (
    <div className={classnames(classes.wrapper, { [classes.wrapperCollapse]: collapse })}>
      {children}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  collapse: PropTypes.bool.isRequired,
};

export default Component;
