import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Drawer, useMediaQuery, useTheme } from '@material-ui/core';
import classnames from 'classnames';
import DrawerItem from './lib/DrawerItem';
import { drawerMenu } from './constant';
import { getUserData } from '../../../../utils/storage';
import { Close } from '@material-ui/icons';

export default function Component(props) {
  const { classes, collapse, handleCollapse } = props;

  const theme = useTheme();
  const mobileClient = useMediaQuery(theme.breakpoints.down('sm'));

  const menu = (item) =>{
    const location = window.location.pathname;
    const active = location.includes(item.path) || location.includes(item.pathDetail);

    return (
      <div className={classes.navMenu}>
        <DrawerItem
          active={active}
          collapse={mobileClient ? false : collapse}
          key={item.path}
          {...item}
        />
      </div>
    )
  };

  const { role } = getUserData();

  const renderMenu = drawerMenu.filter(({ apps }) => {
    return apps.includes(role)
  }).map((item) => {
    if (item) {
      return menu(item);
    }
  })

  const renderMobileDrawer = (
    <Drawer anchor="left" onClose={handleCollapse} open={collapse}>
      <div onClick={handleCollapse} style={{ position: 'absolute', right: 16, top: 16 }}>
        <Close />
      </div>
      <div style={{ width: '300px', paddingRight: 16 }}>
        <Fragment>
          <div className={classes.menuWrapper}>
            {renderMenu}
          </div>
        </Fragment>
      </div>
    </Drawer>
  );

  const renderDesktopDrawer = (
    <div
      className={classnames(classes.main, {
        [classes.mainCollapseed]: collapse
      })}
    >
      <Fragment>
        <div className={classes.menuWrapper}>
          {renderMenu}
        </div>
      </Fragment>
    </div>
  );

  return (
    <div className={classes.wrapper}>
      {mobileClient ? renderMobileDrawer : renderDesktopDrawer}
    </div>
  );
}

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  collapse: PropTypes.bool.isRequired,
  handleCollapse: PropTypes.func.isRequired
};
