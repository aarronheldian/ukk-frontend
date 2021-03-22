import fetch from '../../utils/fetch';
import { getToken } from '../../utils/storage';
import { SERVICES } from '../../configs';
import { ACTIONS } from '../../constants';

export function getListPetugas(params) {
  return dispatch => {
    const options = {
      method: 'GET',
      url: SERVICES.LIST_PETUGAS,
      params: params,
      headers: {
        Authorization: getToken(),
      },
    };
    dispatch(loadingAction());
    fetch(options)
      .then((data) => {
        dispatch(doneLoadingAction());
        dispatch(setDataPetugas(data));
      })
      .catch(() => {
        dispatch(doneLoadingAction());
        dispatch(setDataPetugas({ data: [], meta: {} }));
      });
  };
}

export function addPetugas({ payload, callback }) {
  return dispatch => {
    const options = {
      method: 'POST',
      url: SERVICES.PETUGAS_REGISTER,
      data: payload,
      headers: {
        Authorization: getToken(),
      },
    };
    dispatch(loadingsubmitAction());
    fetch(options)
      .then(({message}) => {
        dispatch(doneLoadingsubmitAction());
        callback({
          content: message,
          success: true
        });
      })
      .catch(({message}) => {
        dispatch(doneLoadingsubmitAction());
        callback({
          content: message,
          success: false
        });
      });
  };
}

export function updatePetugas({ id, payload, callbackAlert, callback }) {
  return dispatch => {
    const options = {
      method: 'PUT',
      url: SERVICES.PETUGAS_ID(id),
      data: payload,
      headers: {
        Authorization: getToken(),
      },
    };
    dispatch(loadingsubmitAction());
    fetch(options)
      .then(({message}) => {
        dispatch(doneLoadingsubmitAction());
        callbackAlert({
          content: message,
          success: true
        });
        callback(null);
      })
      .catch(({message}) => {
        dispatch(doneLoadingsubmitAction());
        callbackAlert({
          content: message,
          success: false
        });
        callback(null);
      });
  };
}

export function deletePetugas({ id, callback }) {
  return dispatch => {
    const options = {
      method: 'DELETE',
      url: SERVICES.PETUGAS_ID(id),
      headers: {
        Authorization: getToken(),
      },
    };
    dispatch(loadingsubmitAction());
    fetch(options)
      .then(({message}) => {
        dispatch(doneLoadingsubmitAction());
        callback({
          content: message,
          success: true
        });
      })
      .catch(({message}) => {
        dispatch(doneLoadingsubmitAction());
        callback({
          content: message,
          success: false
        });
      });
  };
}

export function getDetailPetugas({id, callbackAlert, callback}) {
  return dispatch => {
    const options = {
      method: 'GET',
      url: SERVICES.PETUGAS_ID(id),
      headers: {
        Authorization: getToken(),
      },
    };
    dispatch(loadingsubmitAction());
    fetch(options)
      .then(({ data }) => {
        dispatch(doneLoadingsubmitAction());
        dispatch(setDetailPetugas(data));
        callback(data._id);
      })
      .catch(({message}) => {
        dispatch(doneLoadingsubmitAction());
        dispatch(setDetailPetugas({}));
        callbackAlert({
          content: message,
          success: false
        });
      });
  };
}

export function cleanUp() {
  return (dispatch) => {
    dispatch(setDataPetugas({ data: [], meta: {} }));
  };
}

function setDataPetugas(data) {
  return { type: ACTIONS.LIST_PETUGAS, data };
}

function setDetailPetugas(data) {
  return { type: ACTIONS.DETAIL_PETUGAS, data };
}

function loadingAction() {
  return { type: ACTIONS.LOADING };
}

function doneLoadingAction() {
  return { type: ACTIONS.DONE_LOADING };
}

function loadingsubmitAction() {
  return { type: ACTIONS.LOADING_SUBMIT };
}

function doneLoadingsubmitAction() {
  return { type: ACTIONS.DONE_LOADING_SUBMIT };
}
