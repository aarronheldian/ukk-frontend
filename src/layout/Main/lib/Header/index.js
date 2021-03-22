import { withStyles } from '@material-ui/core/styles';
import Component from './component';
import styles from './styles';
import { withRouter } from 'react-router-dom';

const Styled = withStyles(styles)(Component);

export default withRouter(Styled);
