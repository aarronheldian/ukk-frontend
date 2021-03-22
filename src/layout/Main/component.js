import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Header from './lib/Header';
import Navigation from './lib/Navigation';
import Content from './lib/Content';

export default function Component(props) {
  const [collapse, setCollapse] = useState(false);

  const handleCollapse = () => setCollapse(!collapse);

  const { classes, children } = props;

  return (
    <Fragment>
      <Header handleCollapse={handleCollapse} />
      <div className={classes.wrapper} >
        <Navigation collapse={collapse} handleCollapse={handleCollapse} />
        <Content collapse={collapse}>
          {children}
        </Content>
      </div>
    </Fragment>
  );
}

Component.defaultProps = {
  children: null
};

Component.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired
};
