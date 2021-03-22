import { withStyles } from '@material-ui/core/styles';
import Component from './component';
import styles from './styles';
import { withRouter } from 'react-router-dom';

export default withRouter(withStyles(styles)(Component));
