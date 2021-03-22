const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  iconButton: {
    '&:hover': {
      backgroundColor: '#f0f5fa'
    },
    borderRadius: 8,
    cursor: 'pointer',
    display: 'flex',
    padding: 8,
    transition: '0.3s'
  },
  iconButtonOpen: {
    backgroundColor: '#f0f5fa'
  },
  mainAppBar: {
    borderBottom: '1px solid #D2DADE',
    boxShadow: 'none'
  },
  mainHeader: {
    [theme.breakpoints.down('sm')]: {
      height: 72,
      paddingLeft: 8,
      paddingRight: 24
    },
    height: 72,
    paddingLeft: 20,
    paddingRight: 24
  },
  menuProfile: {
    borderRadius: 8,
    boxShadow: '0px 6px 9px rgba(46, 67, 77, 0.08)',
    marginTop: 50,
    padding: 0,
    width: 240
  },
  profile: {
    '&:hover': {
      backgroundColor: '#f0f5fa',
      cursor: 'pointer'
    },
    borderRadius: 8,
    display: 'flex',
    height: 40,
    marginLeft: 16,
    minWidth: 164,
    padding: '8px 16px',
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
    }
  },
  profileActive: {
    backgroundColor: '#f0f5fa'
  },
});

export default styles;
