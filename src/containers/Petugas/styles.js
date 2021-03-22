const styles = theme => ({
  emptyData: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    height: '72vh',
  },
  emptyTitle: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: 700,
    lineHeight: '30px',
    textAlign: 'center',
    verticalAlign: 'middle',
  }
});

export default styles;
