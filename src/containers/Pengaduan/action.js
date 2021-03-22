import fetch from '../../utils/fetch';
import { getToken } from '../../utils/storage';
import { SERVICES } from '../../configs';
import { ACTIONS } from '../../constants';

export function getListPengaduan(params) {
  return dispatch => {
    const options = {
      method: 'GET',
      url: SERVICES.PENGADUAN,
      params: params,
      headers: {
        Authorization: getToken(),
      },
    };
    dispatch(loadingAction());
    fetch(options)
      .then((data) => {
        dispatch(doneLoadingAction());
        dispatch(setDataPengaduan(data));
      })
      .catch(() => {
        dispatch(doneLoadingAction());
        dispatch(setDataPengaduan({ data: [], meta: {} }));
      });
  };
}

export function addPengaduan({ payload, callback }) {
  return dispatch => {
    const options = {
      method: 'POST',
      url: SERVICES.PENGADUAN_ADD,
      data: payload,
      headers: {
        Authorization: getToken(),
      },
    };
    dispatch(loadingSubmitAction());
    fetch(options)
      .then(({message}) => {
        dispatch(doneLoadingSubmitAction());
        callback({
          content: message,
          success: true
        });
      })
      .catch(({message}) => {
        dispatch(doneLoadingSubmitAction());
        callback({
          content: message,
          success: false
        });
      });
  };
}

export function updateStatus({ id, payload, callback }) {
  return dispatch => {
    const options = {
      method: 'PUT',
      url: SERVICES.PENGADUAN_UPDATE_STATUS(id),
      data: payload,
      headers: {
        Authorization: getToken()
      }
    };
    dispatch(loadingSubmitAction());
    fetch(options)
      .then(({ message }) => {
        callback({
          content: message,
          success: true
        });
        dispatch(doneLoadingSubmitAction());
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

export function download({ callback }) {
  return dispatch => {
    const options = {
      method: 'GET',
      url: SERVICES.PENGADUAN_DOWNLOAD,
      headers: {
        Authorization: getToken()
      }
    };
    dispatch(loadingSubmitAction());
    fetch(options)
      .then(() => {
        callback({
          content: 'Successfuly Download File',
          success: true
        });

        window.location.href = SERVICES.PENGADUAN_DOWNLOAD;

        dispatch(doneLoadingSubmitAction());
      })
      .catch(() => {
        dispatch(doneLoadingSubmitAction());
        callback({
          content: 'Download Failed',
          success: false
        });
      });
  };
}

export function cleanUp() {
  return (dispatch) => {
    dispatch(setDataPengaduan({ data: [], meta: {} }));
  };
}

function setDataPengaduan(data) {
  return { type: ACTIONS.LIST_PENGADUAN, data };
}

function loadingAction() {
  return { type: ACTIONS.LOADING };
}

function doneLoadingAction() {
  return { type: ACTIONS.DONE_LOADING };
}

function loadingSubmitAction() {
  return { type: ACTIONS.LOADING_SUBMIT };
}

function doneLoadingSubmitAction() {
  return { type: ACTIONS.DONE_LOADING_SUBMIT };
}
