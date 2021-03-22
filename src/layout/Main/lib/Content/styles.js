const styles = theme => ({
  wrapper: {
    height: '100%',
    padding: '114px 40px 0px 288px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: '96px 24px 0px 24px',
    },
  },
  wrapperCollapse: {
    paddingLeft: 90,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 24
    },
  }
});

export default styles;
