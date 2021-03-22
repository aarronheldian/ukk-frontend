import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Menu, useTheme, useMediaQuery, Typography, MenuItem, ListItemIcon } from '@material-ui/core';
import { getUserData } from '../../../../utils/storage';
import { logout } from '../../../../utils/common';
import { textLimit } from '../../../../utils/text';
import classnames from 'classnames';

export default function Component(props) {
  const [profileAnchor, setProfileAnchor] = useState(null);

  const { classes, handleCollapse } = props;

  const { name } = getUserData();

  const theme = useTheme();
  const mobileClient = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
    window.scrollTo(0,0);
  }, [props.history.location.pathname]);

  const handleMenu = event => {
    setProfileAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => setProfileAnchor(null);

  const profile = (
    <div
      className={classnames(classes.profile, { [classes.profileActive]: Boolean(profileAnchor) })}
      onClick={handleMenu}
    >
      <AccountCircleIcon />&nbsp;&nbsp;
      <Typography color="inherit" component="span" noWrap variant="body1">
        {textLimit(name, 15)}
      </Typography>
    </div>
  );

  const menuItem = (
    <MenuItem onClick={logout}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <Typography variant="inherit">Logout</Typography>
    </MenuItem>
  );

  const profileDropdown = (
    <Menu
      anchorEl={profileAnchor}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      classes={{ paper: classes.menuProfile }}
      id="menu-appbar"
      keepMounted
      onClose={handleCloseMenu}
      open={profileAnchor}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      {menuItem}
    </Menu>
  );

  const buttonProfile = (
    <div
      className={classnames(classes.iconButton, {
        [classes.iconButtonOpen] : Boolean(profileAnchor)
      })}
      onClick={handleMenu}
    >
      <AccountCircleIcon />
    </div>
  );

  return (
    <div className={classes.grow}>
      <AppBar classes={{ root: classes.mainAppBar }} color="inherit" position="fixed">
        <Toolbar classes={{ root: classes.mainHeader }}>
          <IconButton color="inherit" onClick={handleCollapse}>
            <MenuIcon />
          </IconButton>
          <Typography color="inherit" component="h1" noWrap variant="h6">
            UKK Moklet
          </Typography>
          <div className={classes.grow} />
          {mobileClient && buttonProfile}
          {!mobileClient && profile}
          {profileDropdown}
        </Toolbar>
      </AppBar>
    </div>
  );
}

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  handleCollapse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};
