const styles = theme => ({
  active: {
    backgroundColor: '#f0f5fa',
  },
  emptyLabel: {
    color: 'transparent'
  },
  icon: {
    borderRadius: 8,
    height: 40,
    lineHeight: '50px',
    marginLeft: 20,
    textAlign: 'center',
    width: 40,
  },
  label: {
    alignItems: 'center',
    display: 'flex',
    height: 40,
    paddingLeft: 16
  },
  root: {
    '&:hover': {
      backgroundColor: '#f0f5fa',
      cursor: 'pointer'
    },
    display: 'flex',
    textDecoration: 'none',
    userSelect: 'none',
  },
  link: {
    color: theme.color.black,
    textDecoration: 'none',
  },
  text: {
    color: theme.color.general.main,
    fontWeight: 500,
  },
  textActive: {
    color: '#3f50b5',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
});

export default styles;
