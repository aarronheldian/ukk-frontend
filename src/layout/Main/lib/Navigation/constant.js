import { ROUTES } from '../../../../configs';

export const drawerMenu = [
  {
    name: 'pengaduan',
    label: 'Pengaduan',
    icon: 'pengaduan',
    apps: ['Admin', 'Petugas', 'User'],
    path: ROUTES.PENGADUAN,
  },
  {
    name: 'petugas',
    label: 'Petugas',
    icon: 'petugas',
    apps: ['Admin'],
    path: ROUTES.PETUGAS,
  },
];
