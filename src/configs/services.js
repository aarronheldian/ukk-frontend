/* eslint-disable max-len */
/* eslint-disable no-undef */
let domain = 'http://localhost:5000/api/v1';

// if method PUT, DELETE, POST, GET use 1 endpoint just make one service :)

// USE DETAIL FOR UPDATE BECAUSE SAME ENPOINT

const service = {
  // USER
  LOGIN: `${domain}/users/login`,
  REGISTER_USER: `${domain}/users/register`,

  // PETUGAS
  LIST_PETUGAS: `${domain}/petugas`,
  PETUGAS_ID: id => `${domain}/petugas/${id}`,
  PETUGAS_REGISTER: `${domain}/petugas/register`,
  
  // PETUGAS
  PENGADUAN: `${domain}/pengaduan`,
  PENGADUAN_ID: id => `${domain}/pengaduan/${id}`,
  PENGADUAN_ADD: `${domain}/pengaduan/submit-pengaduan`,
  PENGADUAN_UPDATE_STATUS: id => `${domain}/pengaduan/update-status/${id}`,
  PENGADUAN_DOWNLOAD: `${domain}/pengaduan/download-pengaduan`,
};

export default service;

