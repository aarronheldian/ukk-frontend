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
  },
  cellBody: {
    maxWidth: 200,
    wordWrap: 'break-word'
  },
  tabsIndicator: {
    backgroundColor: theme.palette.primary.main,
  },
  tabSelected: {
    color: theme.palette.primary.main
  },
  blue: {
    backgroundColor: theme.color.blue.soft,
    color: theme.color.blue.main
  },
  green: {
    backgroundColor: theme.color.green.soft,
    color: theme.color.green.main
  },
  red: {
    backgroundColor: theme.color.primary.soft,
    color: theme.color.primary.main
  },
  rootStatus: {
    borderRadius: '4px',
    fontSize: 14,
    fontWeight: 500,
    padding: '4px 8px',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    width: 'fit-content'
  }
});

export default styles;
