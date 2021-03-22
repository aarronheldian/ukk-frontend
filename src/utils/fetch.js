/* eslint-disable no-unused-vars */
import axios from 'axios';
import { logout } from './common';

export default function fetch (options) {
  return new Promise((resolve, reject) => {
    axios(options)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        const defaultError = {
          code: 500,
          status: 'error',
          message: 'Failed to fetch data. Please contact developer.',
        };
        if (!err.response) reject(defaultError);
        else if (!err.response.data) reject(defaultError);
        else if (err.response.data.message === 'fail') {
          window.alert('Sesi Anda telah berakhir, mohon untuk login kembali');
          logout();
        }
        else reject(err.response.data);
      });
  });
};
