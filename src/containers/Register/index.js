import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Component from './component';
import * as actions from './action';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Component);
