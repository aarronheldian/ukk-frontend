import { ROUTES } from '../configs';
import { getUserData, clearStorages } from './storage';
import { ROLE } from '../constants';

export const noop = () => {};

export function checkStrictPath(){
  if(window.location.pathname.includes(ROUTES.LOGIN) || window.location.pathname.includes(ROUTES.REGISTER) )
    return false;
  return true;
}

export function getPathRedirect() {

  let url = '/';

  if (isRole('user') || isRole('admin') || isRole('petugas')) {
    url = ROUTES.PENGADUAN;
  } else {
    url = '/';
  }

  return url;
}

export function redirectTo() {
  window.location.href = getPathRedirect();
}

export const isRole = type => {
  const { role } = getUserData() || {};
  return role === ROLE[type];
};

export const logout = () => {
  clearStorages();
  return window.location.href = ROUTES.LOGIN;
}
