import { createMuiTheme } from '@material-ui/core';
import color from './color';

// A custom theme for this app
const theme = createMuiTheme({
  color,
  typography: {
    fontFamily: 'Ubuntu',
    fontSize: 14,
    color: color.general.main
  },
  paper: {
    boxShadow: '0px 6px 9px rgba(46, 67, 77, 0.08)'
  },
  page: {
    '@keyframes load': {
      to: {
        transform: 'rotate(360deg)'
      }
    },
    refreshIcon: {
      fontSize: 16,
      marginRight: 10
    },
    rotate: {
      animation: '$load steps(100, end) 0.7s infinite'
    },
    tableText: {
      textOverflow: 'ellipsis',
      textTransform: 'capitalize',
      whiteSpace: 'nowrap'
    }
  }
});

export default theme;
