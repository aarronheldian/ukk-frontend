const styles = theme => ({
  banner: {
    backgroundSize: 'cover',
    height: '100vh'
  },
  bgWrapper: {
    backgroundColor: 'white',
    height: '100vh'
  },
  mainWrapper: {
    padding: '0 32px 0 32px',
    [theme.breakpoints.up('md')]: {
      padding: '0 25% 0 25%',
    },
  },
});

export default styles;
