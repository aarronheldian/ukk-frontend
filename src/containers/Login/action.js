import fetch from '../../utils/fetch';
import { setToken, setUserData } from '../../utils/storage';
import { redirectTo } from '../../utils/common';
import { SERVICES } from '../../configs';

export function fetchLogin({ payload, callback }) {
  return dispatch => {
    const options = {
      method: 'post',
      url: SERVICES.LOGIN,
      data: payload,
    };
    fetch(options)
      .then(({ data }) => {
        successLogin(data)(dispatch);
      })
      .catch(() => {
        callback({
          content: 'Your username and password are incorrect. Please try again',
          success: false
        });
      });
  };
}

function successLogin(data) {
  const { accessToken } = data;

  return dispatch => {
    setToken(accessToken);
    setUserData(data);
    redirectTo();
  }
}
