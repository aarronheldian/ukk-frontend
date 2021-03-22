import { ROUTES } from '.';

export default [
  {
    name: 'Pengaduan',
    exact: true,
    path: ROUTES.PENGADUAN,
    apps: ['Admin', 'Petugas', 'User']
  },
  {
    name: 'Petugas',
    exact: true,
    path: ROUTES.PETUGAS,
    apps: ['Admin']
  },
];
