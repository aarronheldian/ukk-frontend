const styles = theme => ({
  divider: {
    backgroundColor: 'white',
    borderTop: `1px solid ${theme.color.general.soft}`,
    marginLeft: 24
  },
  grow: {
    flexGrow: 1
  },
  main: {
    boxShadow: 'none',
    height: '100%',
    position: 'relative',
    width: 248
  },
  mainCollapseed: {
    width: 80,
  },
  menuTitle: {
    paddingLeft: 24
  },
  menuWrapper: {
    padding: '48px 0px'
  },
  toggleButton: {
    display: 'flex',
    flexDirection: 'row-reverse',
    padding: '4px'
  },
  toggleNav: {
    padding: '8px 24px',
  },
  wrapper: {
    height: '100vh',
    padding: '72px 0px 0px 0px',
    position: 'fixed',
    boxShadow: '5px 0px 8px #F2F2F2'
  },
});

export default styles;
