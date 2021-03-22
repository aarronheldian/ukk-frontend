import { ACTIONS } from '../../constants';
import fetch from '../../utils/fetch';
import { redirectTo } from '../../utils/common';
import { SERVICES } from '../../configs';

export function registerMasyarakat({ payload, callback }) {
  return dispatch => {
    const options = {
      method: 'post',
      url: SERVICES.REGISTER_USER,
      data: payload,
    };
    dispatch(loadingSubmitAction());
    fetch(options)
      .then(() => {
        dispatch(doneLoadingSubmitAction());
        callback({
          content: 'Your account is ready to use',
          success: true
        });
        redirectTo();
      })
      .catch(({ message }) => {
        dispatch(doneLoadingSubmitAction());
        callback({
          content: message,
          success: false
        });
      });
  };
}

function loadingSubmitAction() {
  return { type: ACTIONS.LOADING_SUBMIT };
}

function doneLoadingSubmitAction() {
  return { type: ACTIONS.DONE_LOADING_SUBMIT };
}
