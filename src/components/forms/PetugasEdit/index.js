import { reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Component from './component';
import styles from './styles';
import validate from './validate';
import { connect } from 'react-redux';

const Styled = withStyles(styles)(Component);

let ComponentTemp = reduxForm({ form: 'EditPetugasForm', validate, enableReinitialize: true })(Styled);

ComponentTemp = connect(state => {
  const {
    detailPetugas:
    {
      name,
      telp,
      username,
    } = {} } = state.petugas || {};

  return {
    initialValues: {
      name,
      telp,
      username,
    }
  };
})(ComponentTemp);

export default ComponentTemp;